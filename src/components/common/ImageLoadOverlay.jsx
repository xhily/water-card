import ImageLoadError from './ImageLoadError'
import LoadingIndicator from './LoadingIndicator'

export default function ImageLoadOverlay({
  loadState,
  isAutoRetrying,
  onRetry,
  loadingLabel,
  retryingLabel,
  errorMessage,
  overlayClassName = '',
  loadingIndicatorProps = {},
  retryingIndicatorProps = {},
  errorClassName = '',
}) {
  if (loadState === 'loading') {
    return (
      <div className={overlayClassName} aria-live="polite">
        <LoadingIndicator label={loadingLabel} {...loadingIndicatorProps} />
      </div>
    )
  }

  if (loadState === 'error' && isAutoRetrying) {
    return (
      <div className={overlayClassName}>
        <LoadingIndicator label={retryingLabel} {...retryingIndicatorProps} />
      </div>
    )
  }

  if (loadState === 'error') {
    return <ImageLoadError message={errorMessage} className={errorClassName} onRetry={onRetry} />
  }

  return null
}
