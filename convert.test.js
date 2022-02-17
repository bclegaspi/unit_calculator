const convert = require('./business/conversion');

describe('Conversion test', () => {
    it('should return an answer', async () => {
        const reqData = {
            body: {
                unit_from: 'liter',
                unit_to: 'barrel',
                convert: 12,
            }
        };
        const res = {
            status: (code) => {
                console.log(code);
            },
            json: (jsonObj) => {
                console.log(JSON.stringify(jsonObj));
            }
        };
        const response = await convert(reqData, res);
        expect(response.message).toBe('success');
    });
});