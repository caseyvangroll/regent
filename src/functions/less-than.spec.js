import lessThan from './less-than';

describe('lessThan', () => {
  it('lessThan should be a function', () => {
    expect(typeof lessThan).toEqual('function');
  });

  it('lessThan should return true if "left" is less than "right"', () => {
    const actual = lessThan(4, 5);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('lessThan should return false if "left" is greater than "right', () => {
    const actual = lessThan(255, 254);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('lessThan should return false if "left" is equal to "right"', () => {
    const actual = lessThan(123, 123);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('lessThan should return false if the key is undefined', () => {
    const actual = lessThan(undefined, 0);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('lessThan should return false if the key is a string that parses to NaN', () => {
    const redProps = [
      'cool',
      'some string',
      'undefined',
      'null',
      'false',
      'true',
    ];
    redProps.forEach((val) => {
      const actual = lessThan(val, 0);
      const expected = false;
      expect(actual).toEqual(expected, `should return false when passed ${val}`);
    });
  });

  it('lessThan should compare strings based on standard lexicographical ordering, using Unicode values', () => {
    expect(lessThan('a', 'b')).toEqual(true);
    expect(lessThan('aaaa', 'abaa')).toEqual(true);
    expect(lessThan('bb', 'a')).toEqual(false);
    expect(lessThan('baa', 'abb')).toEqual(false);
    expect(lessThan('1', 2)).toEqual(true);
    expect(lessThan('2', 1)).toEqual(false);
    expect(lessThan('2', '4')).toEqual(true);
  });
});

