import * as ValidationUtils from './validation-utils';

describe('validation utils tests', () => {
    
    describe('isOneWord validator', () => {
        
        test('should fail if we provide more than one word', () => {
            let result = ValidationUtils.isOneWord('dummy tes');
            expect(result).toBeFalsy();

            result = ValidationUtils.isOneWord('dummy123');
            expect(result).toBeTruthy();
        });
    });

    describe('isValidAlphanumerics', () => {
        test('should be alowed to use only letters and numbers', () => {
            let result = ValidationUtils.isValidAlphanumerics('dummy tes');
            expect(result).toBeTruthy();

            result = ValidationUtils.isValidAlphanumerics('dummy? word');
            expect(result).toBeFalsy();
        });
    });
});
