import { createCards, heroes } from './heroes'
import { createVillainCards } from './villains'

// 冷烫卡图均为正面在左、背面在右的合并图。
const baseHeroCards = createCards('code_perm', 'webp')

const variantImages = [
  ['雪夜林冲', '林冲'],
  ['马上林冲', '林冲'],
  ['朱仝', '朱仝'],
  ['武松异画', '武松'],
  ['武松打虎', '武松'],
  ['张清', '张清'],
  ['杨志', '杨志'],
  ['徐宁', '徐宁'],
  ['李俊1', '李俊'],
  ['李俊2', '李俊'],
  ['张横', '张横'],
  ['张顺', '张顺'],
  ['燕青', '燕青'],
  ['黄信', '黄信'],
  ['蒋敬', '蒋敬'],
  ['金大坚', '金大坚'],
]

const heroByName = new Map(heroes.map((item) => [item.name, item]))

const variantCards = variantImages.map(([name, baseName], index) => {
  const baseHero = heroByName.get(baseName)
  const number = 115 + index

  return {
    ...baseHero,
    id: String(number).padStart(3, '0'),
    displayId: `异${String(index + 1).padStart(2, '0')}`,
    number,
    name,
    images: {
      source: `${import.meta.env.BASE_URL}assets/code_perm/${number}.webp`,
      layout: 'code_perm',
    },
  }
})

const extraCharacterImages = [
  {
    number: 131,
    name: '兀颜光',
    romanizedName: 'WUYAN GUANG',
    nickname: '大辽都统军',
    introduction: '辽国统军大将，精通兵法并摆下太乙混天象阵与梁山军交锋；阵法被破后兵败，最终被关胜斩杀。',
  },
  {
    number: 132,
    name: '包道乙',
    romanizedName: 'BAO DAOYI',
    nickname: '灵应天师',
    introduction: '方腊麾下妖道，擅使法术与飞剑，曾在睦州之战中斩断武松左臂；后来被梁山军破法，最终遭凌振火炮击杀。',
  },
  {
    number: 133,
    name: '史文恭',
    romanizedName: 'SHI WENGONG',
    nickname: '曾头市教师',
    introduction: '曾头市武艺教师，枪棒高强，夜袭梁山时射中晁盖，是梁山复仇的关键仇敌；最终被卢俊义擒获，剖腹剜心祭奠晁盖。',
  },
  {
    number: 134,
    name: '晁盖',
    romanizedName: 'CHAO GAI',
    nickname: '托塔天王',
    edition: '托塔',
    introduction: '东溪村保正，仗义疏财，智取生辰纲后上梁山并成为寨主；攻打曾头市时中史文恭毒箭，最终伤重身亡。',
  },
  {
    number: 135,
    name: '方腊',
    romanizedName: 'FANG LA',
    nickname: '圣公',
    introduction: '江南方腊起义首领，自立政权并与宋军、梁山军长期交战；兵败后被鲁智深擒获，最终押赴东京处死。',
  },
  {
    number: 136,
    name: '李师师',
    romanizedName: 'LI SHISHI',
    nickname: '东京名妓',
    introduction: '东京名妓，才貌出众，与宋徽宗关系密切，燕青曾借她的门路促成梁山招安；小说未明写其结局，最终下落不明。',
  },
  {
    number: 137,
    name: '王庆',
    romanizedName: 'WANG QING',
    nickname: '淮西王',
    introduction: '淮西反王，聚众割据一方，与梁山军多番交战；兵败被擒后押赴京师，最终被朝廷处死。',
  },
  {
    number: 138,
    name: '琼英',
    romanizedName: 'QIONG YING',
    nickname: '仇氏女将',
    introduction: '田虎麾下女将，擅使飞石，身负家仇而后与张清相认成婚；随军归宋后育有张节，小说未明写其卒年。',
  },
  {
    number: 139,
    name: '田虎',
    romanizedName: 'TIAN HU',
    nickname: '晋王',
    introduction: '河北反王，占据州县自立为晋王，是梁山受招安后征讨的强敌之一；兵败被擒后押赴京师，最终被朝廷处死。',
  },
  {
    number: 140,
    name: '郑彪',
    romanizedName: 'ZHENG BIAO',
    nickname: '郑魔君',
    introduction: '方腊麾下法术将领，能施妖法助阵，曾在睦州之战中害死王英、扈三娘；后来法术被破，最终阵亡。',
  },
  {
    number: 141,
    name: '郑屠',
    romanizedName: 'ZHENG TU',
    nickname: '镇关西',
    introduction: '渭州恶霸屠户，强占民女并欺压金氏父女，引出鲁达打抱不平；最终被鲁达三拳打死。',
  },
  {
    number: 142,
    name: '晁盖',
    romanizedName: 'CHAO GAI',
    nickname: '托塔天王',
    edition: '马上',
    introduction: '东溪村保正，仗义疏财，智取生辰纲后上梁山并成为寨主；攻打曾头市时中史文恭毒箭，最终伤重身亡。',
  },
]

const extraCharacterCards = extraCharacterImages.map((item, index) => ({
  ...item,
  id: String(item.number).padStart(3, '0'),
  displayId: `特${String(index + 1).padStart(2, '0')}`,
  star: '众生',
  images: {
    source: `${import.meta.env.BASE_URL}assets/code_perm/${item.number}.webp`,
    layout: 'code_perm',
  },
}))

const giftImages = [
  '周信用',
  '李云中',
  '陈岱青',
]

const giftCards = giftImages.map((edition, index) => {
  const baseHero = heroByName.get('扈三娘')
  const number = 143 + index

  return {
    ...baseHero,
    id: String(number).padStart(3, '0'),
    displayId: `赠${String(index + 1).padStart(2, '0')}`,
    number,
    name: '扈三娘',
    edition,
    images: {
      source: `${import.meta.env.BASE_URL}assets/code_perm/${number}.webp`,
      layout: 'code_perm',
    },
  }
})

export const heroCards = [...baseHeroCards, ...variantCards, ...extraCharacterCards, ...giftCards]

export const villainCards = createVillainCards({
  assetDirectory: 'code_perm',
  layout: 'code_perm',
})
