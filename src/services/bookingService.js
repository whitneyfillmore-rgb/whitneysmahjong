import { supabase } from './supabase'

function randomCode(prefix) {
  return prefix + '-' + Math.random().toString(36).substring(2, 10).toUpperCase()
}

// Get all bookings for a given day + session (for table map)
export async function getBookedSeats(day, session) {
  const { data, error } = await supabase
    .from('bookings')
    .select('table_number, seats')
    .eq('day', day)
    .eq('session', session)
  if (error) throw error
  return data || []
}

// Create a new table booking
export async function createBooking(booking) {
  const bookingNumber = randomCode('FW')
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      day: booking.day,
      session: booking.session,
      table_number: booking.tableNumber,
      seats: booking.seats,
      name: booking.name,
      email: booking.email,
      member_code: booking.memberCode || null,
      amount_paid: booking.amountDue,
      booking_number: bookingNumber,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single()
  if (error) throw error
  return { ...data, bookingNumber }
}

// Validate a member code against the member_codes table
export async function validateMemberCode(code, dayOfWeek) {
  // dayOfWeek: 0=Sun, 1=Mon, ..., 6=Sat
  const { data, error } = await supabase
    .from('member_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('active', true)
    .single()

  if (error || !data) {
    return { valid: false, reason: 'Code not found or inactive. Please check and try again.' }
  }

  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  if (data.tier === 'east' && isWeekend) {
    return {
      valid: false,
      tier: 'east',
      reason:
        'East Wind membership is valid Monday–Friday only. To book on weekends, please upgrade to a Four Winds membership.',
    }
  }

  return { valid: true, tier: data.tier }
}

// Create a new member and write their code
export async function createMember({ name, email, plan }) {
  const prefix = plan === 'four' ? 'FW' : 'EW'
  const memberCode = randomCode(prefix)

  const { data: member, error: memberError } = await supabase
    .from('members')
    .insert([{
      name,
      email,
      plan,
      member_code: memberCode,
      created_at: new Date().toISOString(),
      next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }])
    .select()
    .single()

  if (memberError) throw memberError

  await supabase.from('member_codes').insert([{
    code: memberCode,
    tier: plan === 'four' ? 'four' : 'east',
    active: true,
  }])

  return { ...member, memberCode }
}

// Create an event/training booking
export async function createEventBooking({ type, date, quantity, name, email, amountPaid }) {
  const bookingNumber = randomCode('EV')
  const { data, error } = await supabase
    .from('event_bookings')
    .insert([{
      type,
      date,
      quantity,
      name,
      email,
      amount_paid: amountPaid,
      booking_number: bookingNumber,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single()
  if (error) throw error
  return { ...data, bookingNumber }
}
