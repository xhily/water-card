import { describe, expect, it } from 'vitest'
import {
  createComparisonCardKey,
  findComparisonCard,
  parseComparisonCardKey,
} from '../../../src/components/comparison/comparisonCardKeys'

describe('comparisonCardKeys', () => {
  it('生成并解析带卡组信息的对比区 key', () => {
    const key = createComparisonCardKey('code_perm', '034')

    expect(key).toBe('code_perm:034')
    expect(parseComparisonCardKey(key)).toEqual({
      collectionId: 'code_perm',
      cardId: '034',
    })
  })

  it('解析无效 key 时返回空标识', () => {
    expect(parseComparisonCardKey('034')).toEqual({
      collectionId: '',
      cardId: '',
    })
  })

  it('按 key 查找对应卡组和卡片', () => {
    const collections = [
      { id: 'standard', cards: [{ id: '001', name: '宋江' }] },
      { id: 'code_perm', cards: [{ id: '034', name: '解珍' }] },
    ]

    expect(findComparisonCard(collections, 'code_perm:034')).toEqual({
      collection: collections[1],
      card: collections[1].cards[0],
    })
    expect(findComparisonCard(collections, 'code_perm:999')).toEqual({
      collection: collections[1],
      card: undefined,
    })
  })
})
