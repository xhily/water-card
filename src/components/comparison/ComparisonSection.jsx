import { useEffect, useRef, useState } from 'react'
import FaceButton from '../common/FaceButton'
import OperationTips from '../common/OperationTips'
import ComparisonGrid from './ComparisonGrid'
import ComparisonPicker from './ComparisonPicker'
import useComparisonCards from './useComparisonCards'
import { COMPARISON_OPERATION_TIPS } from '../../config/operationTips'

export default function ComparisonSection({ collections }) {
  const [face, setFace] = useState('front')
  const [isClearing, setIsClearing] = useState(false)
  const clearTimerRef = useRef(null)
  const {
    pickerCollection,
    pickerCard,
    selectedCards,
    selectedPickerCardIds,
    selectionFull,
    changePickerCollection,
    togglePickerCard,
    reorderCards,
    removeCard,
    clearCards,
    compareSameCharacter,
  } = useComparisonCards(collections)

  useEffect(() => () => {
    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current)
  }, [])

  const clearWithAnimation = () => {
    if (isClearing || selectedCards.length === 0) return
    setIsClearing(true)
    clearTimerRef.current = window.setTimeout(() => {
      clearCards()
      setIsClearing(false)
      clearTimerRef.current = null
    }, 220)
  }

  return (
    <section className="border-t border-[#e6dfcb1f] px-[5vw] py-16 max-sm:px-[18px] max-sm:py-10 mobile-device:px-[18px] mobile-device:py-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-9">
          <h2 className="m-0 text-[clamp(34px,5vw,64px)] font-black tracking-[.12em]">对比区</h2>
        </div>

        <ComparisonPicker
          collections={collections}
          pickerCollection={pickerCollection}
          pickerCard={pickerCard}
          selectedCardIds={selectedPickerCardIds}
          selectedCount={selectedCards.length}
          selectionFull={selectionFull}
          onCollectionChange={changePickerCollection}
          onCardToggle={togglePickerCard}
        />

        <ComparisonGrid
          cards={selectedCards}
          face={face}
          onReorder={reorderCards}
          onRemove={removeCard}
          isClearing={isClearing}
        />

        {selectedCards.length > 0 && (
          <ComparisonFaceSwitch
            face={face}
            onChange={setFace}
            onCompareSameCharacter={compareSameCharacter}
            onClear={clearWithAnimation}
            isClearing={isClearing}
          />
        )}

        <OperationTips items={COMPARISON_OPERATION_TIPS} className="mx-auto mt-12 max-w-[760px]" />
      </div>
    </section>
  )
}

function ComparisonFaceSwitch({ face, onChange, onCompareSameCharacter, onClear, isClearing }) {
  return (
    <div className="mt-9 flex flex-wrap items-center justify-center gap-5 max-sm:gap-4 mobile-device:gap-4" role="group" aria-label="统一切换卡片正反面与同人物对比">
      <FaceButton label="正面" mark="正" size="md" active={face === 'front'} onClick={() => onChange('front')} />
      <span className="font-sans text-[22px] text-[#c7a762]" aria-hidden="true">↔</span>
      <FaceButton label="背面" mark="背" size="md" active={face === 'back'} onClick={() => onChange('back')} />
      <button
        type="button"
        onClick={onCompareSameCharacter}
        className="min-h-10 rounded-md border border-[#3a4039] bg-[#111611] px-5 text-[11px] tracking-[.16em] text-[#c9ad65] transition-colors hover:border-[#8a7650] hover:text-[#e0c887] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a76266] max-sm:w-full mobile-device:w-full"
      >
        同人物对比
      </button>
      <button
        type="button"
        onClick={onClear}
        disabled={isClearing}
        className={`min-h-10 rounded-md border border-[#4d3430] bg-[#15100f] px-5 text-[11px] tracking-[.16em] text-[#d58a79] transition-[border-color,color,opacity,transform] duration-150 hover:border-[#bc6757] hover:text-[#f0b6a9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bc675766] disabled:cursor-not-allowed disabled:scale-95 disabled:opacity-55 max-sm:w-full mobile-device:w-full ${isClearing ? 'border-[#bc6757] text-[#f0b6a9]' : ''}`}
      >
        {isClearing ? '清空中' : '清空对比区'}
      </button>
    </div>
  )
}
