export const readablizeBytes = (bytes: number) => {
    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + " " + s[e];
}

export const getNumber = (data: string) => {
    return +(data.substring(0, data.length - 2));
  }
  
export const rawUnit = (value: string): number => {
    let data = +value;
    if (value.indexOf('Ki') > 0) {
      data = getNumber(value) * 1024;
    }
    else if (value.indexOf('Mi') > 0) {
      data = getNumber(value) * 1024 * 1024;
    }
    else if (value.indexOf('Gi') > 0) {
      data = getNumber(value) * 1024 * 1024 * 1024;
    }
    return data;
  }