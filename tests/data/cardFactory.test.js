import { describe, expect, it } from 'vitest'
import {
  cardId,
  createNamedLookup,
  createNumberedCardHelpers,
  prefixedDisplayId,
} from '../../src/data/cardFactory'

describe('cardFactory', () => {
  it('生成统一编号和带前缀的展示编号', () => {
    expect(cardId(7)).toBe('007')
    expect(prefixedDisplayId('特', 2)).toBe('特03')
  })

  it('生成连续编号卡片并补充图片信息', () => {
    const { createNumberedCards } = createNumberedCardHelpers({
      assetDirectory: 'sample_cards',
      layout: 'split_card',
    })

    expect(createNumberedCards({
      items: ['甲', '乙'],
      startNumber: 12,
      displayPrefix: '异',
      mapItem: (name) => ({ name }),
    })).toEqual([
      {
        id: '012',
        displayId: '异01',
        number: 12,
        name: '甲',
        images: {
          source: '/assets/sample_cards/12.webp',
          layout: 'split_card',
        },
      },
      {
        id: '013',
        displayId: '异02',
        number: 13,
        name: '乙',
        images: {
          source: '/assets/sample_cards/13.webp',
          layout: 'split_card',
        },
      },
    ])
  })

  it('按名称查找基础资料并在缺失时抛出明确错误', () => {
    const lookup = createNamedLookup(
      [{ name: '宋江', nickname: '呼保义' }],
      (name) => `Missing hero: ${name}`,
    )

    expect(lookup('宋江')).toMatchObject({ nickname: '呼保义' })
    expect(() => lookup('卢俊义')).toThrow('Missing hero: 卢俊义')
  })
})
