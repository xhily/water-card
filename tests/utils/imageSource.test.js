import { describe, expect, it } from 'vitest'
import { getRetryImageSource } from '../../src/utils/imageSource'

describe('getRetryImageSource', () => {
  it('首次加载保持原地址', () => {
    expect(getRetryImageSource('/assets/standard/1.webp', 0)).toBe('/assets/standard/1.webp')
  })

  it('重试时追加新的查询参数', () => {
    expect(getRetryImageSource('/assets/standard/1.webp', 2)).toBe('/assets/standard/1.webp?retry=2')
    expect(getRetryImageSource('/image.webp?v=1#front', 3)).toBe('/image.webp?v=1&retry=3#front')
  })
})
