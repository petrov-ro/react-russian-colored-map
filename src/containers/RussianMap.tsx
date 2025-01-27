import React, {useState} from 'react'
import RUSSIAN_MAP from 'constants/RUSSIAN_MAP'
import DEFAULT_TOOLTIP from 'constants/DEFAULT_TOOLTIP'
import {RussianMapType} from 'types/RussianMapType'
import {DictEntryType} from 'types/DictEntryType'
import {TooltipType} from 'types/TooltipType'
import './RussianMap.scss'

const RussianMap: React.FC<RussianMapType> = (props: RussianMapType): JSX.Element => {
    const {
        lakes = false,
        fillColor = '#D9D9D9',
        fillStroke = '#A6BECE',
        data = {}
    } = props

    const [tooltip, setTooltip] = useState<TooltipType>(DEFAULT_TOOLTIP)

    // отобразить подсказку
    const viewTooltip = (e, id) => {
        const x = document.body.scrollLeft;
        const y = document.body.scrollTop;

        setTooltip({
            popupDisplay: true,
            x: (e.pageX - x) + 10,
            y: (e.pageY - y) + 10,
            id
        })
    }

    // позиционирование всплывающей подсказки
    const popupStyle = {
        top: tooltip.y,
        left: tooltip.x,
    }

    // элемент карты соответствующий позиции курсора
    const tooltipItem = RUSSIAN_MAP[tooltip.id]

    return (
        <div className='russian-colored-map-wrap'>
            {tooltip.popupDisplay &&
            <div className='tooltip' style={popupStyle}>
                {data[tooltipItem.code]?.descr || tooltipItem.value}
            </div>
            }

            <svg
                width='100%'
                height='689'
                className='russian-colored-map'
                viewBox='-365 196 1188 689'
                x='0px'
                y='0px'
                version='1.1'>

                {RUSSIAN_MAP.map((item: DictEntryType, index: number) =>
                    <path
                        key={item.key}
                        id={item.key}
                        d={item.path}
                        className='russian-map-region'
                        fill={data[item.code]?.color || fillColor}
                        stroke={data[item.code]?.stroke || fillStroke}
                        onMouseMove={(e) => viewTooltip(e, index)}
                        onMouseOut={() => setTooltip(DEFAULT_TOOLTIP)}/>
                )}

                {lakes &&
                <g>
                    <path id="vectormap1_lake-onega" className="russian-map-lake"
                          d="M-170.6,430.5l2.4-1.2l1.2-3.6l-1.2-5.9l1.2-5.9v1.2h1.2l1.2-2.4l1.2-2.4v3.6h1.2 l1.2-3.6l1.2-2.4v1.2v1.2v1.2l0,0l1.2-2.4l1.2-1.2l-1.2,3.6l-2.4,4.8h1.2l0,0l1.2-2.4v1.2l2.4,1.2l2.4-4.8v-1.1h-1.2v1.2v-1.2v-1.2 l-1.2,1.2l0,0l1.2-3.6l1.2-3.6l1.2,10.7l-5.9,8.3l-1.2,3.6l-1.2,4.8v1.2l-3.6,1.2l-4.8,1.2l-1.2-1.2l-1.2-2.4h1.1V430.5z"/>
                    <path id="vectormap1_lake-ladoga" className="russian-map-lake"
                          d="M-190.8,419.9l-1.2-1.2l-2.4,2.4l-3.6,1.2l-2.4-3.6h-3.6l-2.4-1.2l-1.2-1.2h1.2 l1.2-2.4l1.2-2.4l2.4-5.9l3.6-4.8v-2.4v-1.2V396v-1.2l1.2,1.2h1.2h3.6h3.6l1.2-1.2l0,0l1.2,11.9l-3.6,13.1h-1.2V419.9z"/>
                    <path id="vectormap1_lake-rybinsk" className="russian-map-lake"
                          d="M-180.1,476.9l-1.2,3.6l-2.4,2.4v-1.2v-1.3v-1.2l-3.6,1.2l-1.2-1.2l1.2-1.2h1.2 l-1.2-7.1l1.2-7.1l0,0v1.2v1.2v1.2v3.6l1.2,1.2h2.4l1.2-1.2v-3.6l1.2-3.6l1.2,1.2l-1.2,2.4v4.8L-180.1,476.9L-180.1,476.9z"/>
                    <path id="vectormap1_lake-baykal" className="russian-map-lake"
                          d="M349.7,721.5l2.4-4.8l3.6-1.2l-1.2,15.4l-2.4,16.6l-1.2,1.2l-1.2,1.2v-1.2v-2.4 l-1.2-1.2l-1.2,2.4l-1.2,2.4h1.2h2.4v2.4l-1.2,2.4h-1.2h-1.2l-2.4,3.6l-3.6,4.8l-14.3,5.9l-1.2,3.6l-1.2,3.6l-8.3,4.8l-4.8,1.2 l-1.2,1.2v-1.2l-8.3-2.4l3.6-1.2l5.9-2.4l-1.2-1.2l-2.4-1.2v-1.2l-1.2-1.2v-1.2l3.6,3.6l4.8,2.4l14.3-15.4l17.8-26.1L349.7,721.5z"/>

                    <circle cx="-212.1" cy="408.5" r="2.3" fill="red" className="russian-map-capital"/>
                    <circle cx="-364.3" cy="592.3" r="2.3" fill="red" className="russian-map-capital"/>
                    <circle cx="-216.1" cy="500.7" r="2.3" fill="red" className="russian-map-capital"/>
                </g>
                }
            </svg>
        </div>
    );
}

export default RussianMap
