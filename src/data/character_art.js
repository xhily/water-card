import { createCards, heroes } from './heroes'
import { villains } from './villains'

const CHARACTER_ART_ASSET_DIRECTORY = 'character_art'

const baseHeroCards = createCards(CHARACTER_ART_ASSET_DIRECTORY, 'webp')

const characterArtImage = (number) => ({
  source: `${import.meta.env.BASE_URL}assets/${CHARACTER_ART_ASSET_DIRECTORY}/${number}.webp`,
  layout: CHARACTER_ART_ASSET_DIRECTORY,
})

const cardId = (number) => String(number).padStart(3, '0')

const createCharacterArtCard = ({ number, displayId, images, ...card }) => ({
  ...card,
  id: cardId(number),
  displayId,
  number,
  images: images ?? characterArtImage(number),
})

const displayId = (prefix, index) => `${prefix}${String(index + 1).padStart(2, '0')}`

const createNumberedCharacterArtCards = ({ items, startNumber, displayPrefix, mapItem }) =>
  items.map((item, index) => createCharacterArtCard({
    ...mapItem(item, index),
    number: startNumber + index,
    displayId: displayId(displayPrefix, index),
  }))

const heroByName = new Map(heroes.map((item) => [item.name, item]))
const villainByName = new Map(villains.map((item) => [item.name, item]))

const getHeroByName = (name) => {
  const hero = heroByName.get(name)
  if (!hero) throw new Error(`Missing base hero for character_art card: ${name}`)
  return hero
}

const getVillainByName = (name) => {
  const villain = villainByName.get(name)
  if (!villain) throw new Error(`Missing base villain for character_art card: ${name}`)
  return villain
}

const createHeroBasedCard = (baseName, overrides) => ({
  ...getHeroByName(baseName),
  ...overrides,
})

const villainItems = [
  '西门庆',
  '潘金莲',
  '高衙内',
]

export const villainCards = createNumberedCharacterArtCards({
  items: villainItems,
  startNumber: 112,
  displayPrefix: '恶',
  mapItem: (name) => getVillainByName(name),
})

const extraCharacterItems = [
  createHeroBasedCard('朱富', { name: '朱富', edition: '错版' }),
  {
    name: '琼英',
    romanizedName: 'QIONG YING',
    nickname: '仇氏女将',
    introduction: '田虎麾下女将，擅使飞石，身负家仇而后与张清相认成婚；随军归宋后育有张节，小说未明写其卒年。',
  },
  {
    name: '阎婆惜',
    romanizedName: 'YAN POXI',
    nickname: '外室',
    introduction: '郓城县女子，受宋江接济后成为其外室，后来发现梁山书信并要挟宋江；争执中被宋江杀死。',
  },
  {
    name: '李师师',
    romanizedName: 'LI SHISHI',
    nickname: '东京名妓',
    introduction: '东京名妓，才貌出众，与宋徽宗关系密切，燕青曾借她的门路促成梁山招安；小说未明写其结局，最终下落不明。',
  },
]

export const extraCharacterCards = createNumberedCharacterArtCards({
  items: extraCharacterItems,
  startNumber: 115,
  displayPrefix: '特',
  mapItem: (item) => ({
    ...item,
    star: '特卡',
  }),
})

export const heroCards = baseHeroCards

export const cards = [...heroCards, ...villainCards, ...extraCharacterCards]
