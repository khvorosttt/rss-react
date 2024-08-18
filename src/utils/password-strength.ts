export default function passwordStrength(password: string | undefined) {
    if (password === undefined) {
        return '';
    }
    if (password !== '') {
        let strength = 0;
        if (/[0-9]/.test(password)) {
            strength++;
        }
        if (/[A-Z]/.test(password)) {
            strength++;
        }
        if (/[a-z]/.test(password)) {
            strength++;
        }
        if (/[@$!%*?&#]/.test(password)) {
            strength++;
        }
        if (strength > 0 && strength < 3) {
            return 'low';
        } else if (strength === 3) {
            return 'middle';
        } else if (strength === 4) {
            return 'high';
        }
        return '';
    }
}
