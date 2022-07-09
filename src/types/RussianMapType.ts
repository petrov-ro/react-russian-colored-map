export type RussianMapType = {
    lakes?: boolean                         // показывать озера
    fillColor?: string                      // дефолтный цвет заливки
    fillStroke?: string                     // дефолтный цвет границ
    data?: Record<string, DataEntryType>    // кастомные данные для регионов
}

export type DataEntryType = {
    color?: string    // цвет заливки региона
    stroke?: string   // цвет границы региона
    descr?: string    // название региона
}
