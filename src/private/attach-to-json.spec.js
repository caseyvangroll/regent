import attachToJson from './attach-to-json'
import equals from '../functions/equals'

describe('attachToJson', () => {
  it('should be a function', async () => {
    expect(typeof attachToJson).toEqual('function')
  })

  it('should should add a toJson method to the passed in composition function.', async () => {
    const A = equals('@foo', 'a')
    const B = equals('@bar', 'a')

    const data = {
      foo: 'a',
      bar: 'a'
    }

    function novelAndFn (a, b) {
      return attachToJson(function novelAnd (data) {
        return a(data) && b(data)
      }, [a, b])
    }

    const MY_RULE = novelAndFn(A, B)

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({
      novelAnd: [
        { equals: ['@foo', 'a'] },
        { equals: ['@bar', 'a'] }
      ]
    })

    expect(expected).toEqual(actual)
  })

  it('should should return a json string with nested compositions.', async () => {
    const A = equals('@foo', 'a')
    const B = equals('@bar', 'b')

    function novelAndFn (a, b) {
      return attachToJson(function novelAnd (data) {
        return a(data) && b(data)
      }, [a, b])
    }

    const RULE_ONE = novelAndFn(A, B)
    const RULE_TWO = novelAndFn(A, A)

    const COMP = novelAndFn(RULE_ONE, RULE_TWO)

    const actual = COMP.toJson()
    const expected = JSON.stringify({
      novelAnd: [
        {
          novelAnd: [
            { equals: ['@foo', 'a'] },
            { equals: ['@bar', 'b'] }
          ]
        },
        {
          novelAnd: [
            { equals: ['@foo', 'a'] },
            { equals: ['@foo', 'a'] }
          ]
        }
      ]
    })

    expect(expected).toEqual(actual)
  })
})
