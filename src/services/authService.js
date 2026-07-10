/**
 * MindGuard AI – Auth Service  
 */

export async function loginUser(email, password) {
  await new Promise(r => setTimeout(r, 800))
  if (!email || password.length < 6) {
    throw new Error('Invalid email or password (min 6 characters).')
  }
  return {
    id: 'demo-001',
    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
    email,
    token: `jwt-demo-${Date.now()}`,
  }
}

export async function registerUser(name, email, password) {
  await new Promise(r => setTimeout(r, 1000))
  if (!name || !email || password.length < 8) {
    throw new Error('Please fill all fields and use a password of 8+ characters.')
  }
  return {
    id: `user-${Date.now()}`,
    name,
    email,
    token: `jwt-demo-${Date.now()}`,
  }
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password) {
  return password.length >= 8
}
