import * as LucideIcons from 'lucide-static'

let icons = {}
for (const icon in LucideIcons) {
  if (icon == 'default') {
    continue
  }
  let iconSvg = LucideIcons[icon]

  // set stroke-width to 1.5
  if (iconSvg && iconSvg.includes('stroke-width')) {
    iconSvg = iconSvg.replace(/stroke-width="2"/g, 'stroke-width="1.5"')
  }
  icons[icon] = iconSvg

  let dashKeys = camelToDash(icon)
  for (let dashKey of dashKeys) {
    if (dashKey !== icon) {
      icons[dashKey] = iconSvg
    }
  }
}

export default icons

function camelToDash(key) {
  // barChart2 -> bar-chart-2
  let withNumber = key.replace(/[A-Z0-9]/g, (m) => '-' + m.toLowerCase())
  if (withNumber.startsWith('-')) {
    withNumber = withNumber.substring(1)
  }
  // barChart2 -> bar-chart2
  let withoutNumber = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
  if (withoutNumber.startsWith('-')) {
    withoutNumber = withoutNumber.substring(1)
  }

  if (withNumber !== withoutNumber) {
    // both are required because unplugin icon resolver doesn't put a dash before numbers
    return [withNumber, withoutNumber]
  }
  return [withNumber]
}
