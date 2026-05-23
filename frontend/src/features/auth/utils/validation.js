const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value) {
  if (!value?.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(value.trim())) return 'Enter a valid email address';
  return '';
}

export function validatePassword(value, { minLength = 8 } = {}) {
  if (!value) return 'Password is required';
  if (value.length < minLength) return `Password must be at least ${minLength} characters`;
  return '';
}

export function validateConfirmPassword(password, confirm) {
  if (!confirm) return 'Please confirm your password';
  if (password !== confirm) return 'Passwords do not match';
  return '';
}

export function validateUsername(value) {
  if (!value?.trim()) return 'Username is required';
  if (value.trim().length < 3) return 'Username must be at least 3 characters';
  if (!/^[a-zA-Z0-9_]+$/.test(value.trim()))
    return 'Username can only contain letters, numbers, and underscores';
  return '';
}

export function validateRequiredCheckbox(checked, message = 'This field is required') {
  return checked ? '' : message;
}
