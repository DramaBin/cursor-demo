// RFC 5322 compliant pattern (UI Bakery regex library)
// https://uibakery.io/regex-library/email
const RFC5322_EMAIL_RE =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

/**
 * 사용자 배열에서 이메일 필드를 추출한다.
 * @param {Array<{ email?: string }>} users - 사용자 객체 배열
 * @returns {string[]} 추출된 이메일 목록
 */
function extractEmails(users) {
  if (!Array.isArray(users)) {
    return [];
  }
  return users.map((user) => user.email);
}

/**
 * 이메일 주소 형식이 RFC 5322 규격에 맞는지 검증한다.
 * @param {unknown} email - 검증할 이메일
 * @returns {boolean} 유효하면 true
 */
function isValidEmail(email) {
  if (typeof email !== "string") {
    return false;
  }

  const trimmed = email.trim();
  if (trimmed.length > 254) {
    return false;
  }

  if (!RFC5322_EMAIL_RE.test(trimmed)) {
    return false;
  }

  const localPart = trimmed.split("@")[0];
  return localPart.length <= 64;
}

/**
 * 사용자 배열에서 유효한 이메일만 추출한다.
 * @param {Array<{ email?: string }>} users - 사용자 객체 배열
 * @returns {string[]} 유효한 이메일 목록
 */
function getValidEmails(users) {
  return extractEmails(users).filter(isValidEmail);
}

/**
 * 사용자 배열에서 유효한 이메일만 추출하고 중복을 제거한다.
 * @param {Array<{ email?: string }>} users - 사용자 객체 배열
 * @returns {string[]} 중복이 제거된 유효 이메일 목록
 */
function getUniqueValidEmails(users) {
  const seen = new Set();

  return getValidEmails(users).filter((email) => {
    const key = email.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export { extractEmails, isValidEmail, getValidEmails, getUniqueValidEmails };
