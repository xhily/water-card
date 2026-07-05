export function getRetryImageSource(source, attempt) {
  if (!attempt) return source

  const [url, hash] = source.split('#', 2)
  const separator = url.includes('?') ? '&' : '?'
  const retryUrl = `${url}${separator}retry=${attempt}`
  return hash ? `${retryUrl}#${hash}` : retryUrl
}
