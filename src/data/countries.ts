export interface Country {
  code: string // ISO 3166-1 alpha-2
  name: string
  dialCode: string
  flag: string
  format: string
  minLength: number
  maxLength: number
  pattern?: RegExp
}

export const COUNTRIES: Country[] = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', format: '98765 43210', minLength: 10, maxLength: 10 },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', format: '50 123 4567', minLength: 9, maxLength: 9 },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', format: '(555) 000-0000', minLength: 10, maxLength: 10 },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', format: '7911 123456', minLength: 10, maxLength: 11 },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', format: '412 345 678', minLength: 9, maxLength: 10 },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', format: '8123 4567', minLength: 8, maxLength: 8 },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', format: '50 123 4567', minLength: 9, maxLength: 9 },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', format: '3312 3456', minLength: 8, maxLength: 8 },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', format: '9123 4567', minLength: 8, maxLength: 8 },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', format: '9123 4567', minLength: 8, maxLength: 8 },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', format: '3912 3456', minLength: 8, maxLength: 8 },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', format: '(555) 000-0000', minLength: 10, maxLength: 10 },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', format: '79 123 45 67', minLength: 9, maxLength: 9 },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', format: '6 12 34 56 78', minLength: 9, maxLength: 9 },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', format: '151 1234567', minLength: 10, maxLength: 12 },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', format: '312 345 6789', minLength: 9, maxLength: 10 },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', format: '612 34 56 78', minLength: 9, maxLength: 9 },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', format: '6 12345678', minLength: 9, maxLength: 9 },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪', format: '470 12 34 56', minLength: 9, maxLength: 9 },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪', format: '70 123 45 67', minLength: 9, maxLength: 10 },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴', format: '412 34 567', minLength: 8, maxLength: 8 },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰', format: '20 12 34 56', minLength: 8, maxLength: 8 },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', format: '85 123 4567', minLength: 9, maxLength: 9 },
  { code: 'MC', name: 'Monaco', dialCode: '+377', flag: '🇲🇨', format: '6 12 34 56 78', minLength: 8, maxLength: 9 },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', format: '12 345 6789', minLength: 9, maxLength: 10 },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', format: '812 3456 7890', minLength: 10, maxLength: 12 },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', format: '81 234 5678', minLength: 9, maxLength: 9 },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', format: '90 1234 5678', minLength: 10, maxLength: 10 },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', format: '10 1234 5678', minLength: 9, maxLength: 10 },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰', format: '9123 4567', minLength: 8, maxLength: 8 },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', format: '21 123 4567', minLength: 9, maxLength: 10 },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', format: '82 123 4567', minLength: 9, maxLength: 9 },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', format: '11 91234 5678', minLength: 10, maxLength: 11 },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷', format: '532 123 4567', minLength: 10, maxLength: 10 },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', format: '10 1234 5678', minLength: 10, maxLength: 10 },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', format: '802 123 4567', minLength: 10, maxLength: 10 },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', format: '712 345678', minLength: 9, maxLength: 9 },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺', format: '912 345-67-89', minLength: 10, maxLength: 10 },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿', format: '701 123 4567', minLength: 10, maxLength: 10 },
  { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾', format: '96 123456', minLength: 8, maxLength: 8 },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹', format: '9912 3456', minLength: 8, maxLength: 8 },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷', format: '69 1234 5678', minLength: 10, maxLength: 10 },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', format: '912 345 678', minLength: 9, maxLength: 9 },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹', format: '664 1234567', minLength: 9, maxLength: 11 },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱', format: '512 345 678', minLength: 9, maxLength: 9 },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺', format: '621 123 456', minLength: 8, maxLength: 9 },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱', format: '50 123 4567', minLength: 9, maxLength: 9 },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', format: '71 234 5678', minLength: 9, maxLength: 9 },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', format: '1712 345678', minLength: 10, maxLength: 10 },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', format: '9841 234567', minLength: 10, maxLength: 10 },
]

export const DEFAULT_COUNTRY = COUNTRIES[0] // India (+91)

/**
 * Smart phone parser & country detector:
 * Handles pasted text like "+971 50 123 4567", "0044 7911 123456", "9110656326", "+91 91106 56326"
 */
export function parsePastedPhone(
  rawInput: string,
  currentCountry: Country
): { detectedCountry: Country; nationalNumber: string } {
  let cleaned = rawInput.trim()
  if (cleaned.startsWith('00')) {
    cleaned = '+' + cleaned.slice(2)
  }

  if (cleaned.startsWith('+')) {
    // Sort dial codes by length descending (e.g. +971 before +9)
    const sorted = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length)
    for (const country of sorted) {
      if (cleaned.startsWith(country.dialCode)) {
        const remaining = cleaned.slice(country.dialCode.length).replace(/\D/g, '')
        return { detectedCountry: country, nationalNumber: remaining }
      }
    }
  }

  // Fallback: strip all non-digits
  const digitsOnly = cleaned.replace(/\D/g, '')
  return { detectedCountry: currentCountry, nationalNumber: digitsOnly }
}

/**
 * Validate phone number based on country rules
 */
export function validatePhoneNumber(
  number: string,
  country: Country
): { isValid: boolean; error?: string; e164?: string } {
  const digits = number.replace(/\D/g, '')

  if (!digits) {
    return { isValid: false, error: 'Phone number is required.' }
  }

  if (digits.length < country.minLength) {
    return {
      isValid: false,
      error: `Phone number is too short (${digits.length}/${country.minLength} digits for ${country.name}).`,
    }
  }

  if (digits.length > country.maxLength) {
    return {
      isValid: false,
      error: `Phone number is too long (${digits.length}/${country.maxLength} digits for ${country.name}).`,
    }
  }

  const e164 = `${country.dialCode}${digits}`
  return { isValid: true, e164 }
}

/**
 * Format digits for clean display as user types
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 4) return digits
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`
  if (digits.length <= 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`
  return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`
}
