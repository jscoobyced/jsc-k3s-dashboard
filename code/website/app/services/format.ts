export const Formatter = () => {
  const readablizeBytes = (bytes: number) => {
    if (bytes < 0) return ''
    if (bytes === 0) return '0 bytes'
    const s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB']
    const e = Math.floor(Math.log(bytes) / Math.log(1024))
    return (
      (bytes / Math.pow(1024, e)).toFixed(s[e] == 'bytes' ? 0 : 2) + ' ' + s[e]
    )
  }

  const getNumber = (data: string) => {
    return +data.substring(0, data.length - 2)
  }

  const rawUnit = (value: string): number => {
    let data = +value

    if (value.indexOf('Ki') > 0) {
      data = getNumber(value) * 1024
    } else if (value.indexOf('Mi') > 0) {
      data = getNumber(value) * 1024 * 1024
    } else if (value.indexOf('Gi') > 0) {
      data = getNumber(value) * 1024 * 1024 * 1024
    } else {
      return 0
    }
    if (data < 0) return 0
    return data
  }

  const readableCpuMetric = (value: string): string => {
    const cpuValue = parseInt(value)
    const ratioNanoCore = 1000000
    let ratio = 1
    if (value.indexOf('n') > 0) {
      ratio = ratioNanoCore
    }
    
    const cpuInMillicores = (cpuValue / ratio).toFixed(2)
    return `${cpuInMillicores}m`
  }

  const readableMemoryMetric = (value: string): string => {
    const memoryValue = parseInt(value)
    const ratioKilo = 1024
    let ratio = 1
    if (value.indexOf('Ki') > 0) {
      ratio = ratioKilo
    }
    const memoryInMega = (memoryValue / ratio).toFixed(2)
    return `${memoryInMega}Mi`
  }

  return {
    readablizeBytes,
    rawUnit,
    readableCpuMetric,
    readableMemoryMetric,
  }
}
