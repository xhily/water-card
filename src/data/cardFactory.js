export const cardId = (number) => String(number).padStart(3, '0')

export const prefixedDisplayId = (prefix, index) => `${prefix}${String(index + 1).padStart(2, '0')}`

export const createCardImage = ({
  assetDirectory,
  imageExtension = 'webp',
  layout = assetDirectory,
  number,
}) => ({
  source: `${import.meta.env.BASE_URL}assets/${assetDirectory}/${number}.${imageExtension}`,
  layout,
})

export const createNamedLookup = (items, missingMessage) => {
  const byName = new Map(items.map((item) => [item.name, item]))

  return (name) => {
    const item = byName.get(name)
    if (!item) throw new Error(missingMessage(name))
    return item
  }
}

export const createNumberedCardHelpers = ({
  assetDirectory,
  imageExtension = 'webp',
  layout = assetDirectory,
}) => {
  const image = (number) => createCardImage({
    assetDirectory,
    imageExtension,
    layout,
    number,
  })

  const createCard = ({ number, displayId = cardId(number), images, ...card }) => ({
    ...card,
    id: cardId(number),
    displayId,
    number,
    images: images ?? image(number),
  })

  const createNumberedCards = ({ items, startNumber, displayPrefix, mapItem }) =>
    items.map((item, index) => createCard({
      ...mapItem(item, index),
      number: startNumber + index,
      displayId: prefixedDisplayId(displayPrefix, index),
    }))

  return {
    createCard,
    createNumberedCards,
    image,
  }
}
