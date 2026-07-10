import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ImageLoadOverlay from '../../../src/components/common/ImageLoadOverlay'

describe('ImageLoadOverlay', () => {
  it('显示加载状态', () => {
    render(<ImageLoadOverlay loadState="loading" loadingLabel="图片加载中" />)

    expect(screen.getByLabelText('图片加载中')).toBeInTheDocument()
  })

  it('显示自动重试状态', () => {
    render(<ImageLoadOverlay loadState="error" isAutoRetrying retryingLabel="正在重试" />)

    expect(screen.getByLabelText('正在重试')).toBeInTheDocument()
  })

  it('显示失败状态并允许手动重试', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ImageLoadOverlay loadState="error" errorMessage="图片加载失败" onRetry={onRetry} />)

    expect(screen.getByText('图片加载失败')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '重新加载' }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
