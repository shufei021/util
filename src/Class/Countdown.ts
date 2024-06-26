
interface optProps {
    format?: string,
    list?: Array<any>,
    timeKey: string,
    type: number
}
interface dateProps {
    d: string | number,
    h: string | number,
    m: string | number,
    s: string | number,
}
export class Countdown {
    timer: any
    ft: string
    list: Array<any>
    key: string
    type: number
    constructor(opt: optProps) {
        this.timer = null
        this.ft = opt.format || 'dd天hh时mm分ss秒'
        this.list = opt.list || []
        this.key = opt.timeKey
        this.type = opt.type
        this.update()
    }
    update() {
        this.operation(1)
    }
    cancel() {
        this.operation(0)
    }
    calc(item: { [x: string]: string | number}) {
        const time = item[this.key]
        const e = (new Date(String(time).replace(/-/g, "/")).getTime() - +new Date()) / 1e3;
        const t = Math.floor(e % 86400 / 3600)
        const t1 = t / 60
        const t2 = e % 60
        const date: dateProps = {
            d: Math.floor(e / 86400) <= 0 ? '00' : Math.floor(e / 86400), //还剩多少天
            h: parseInt(String(t)) <= 0 ? '00' : String(parseInt(String(t))).padStart(2, '0'), // 还剩多少时
            m: parseInt(String(t1)) <= 0 ? '00' : String(parseInt(String(t1))).padStart(2, '0'), //还剩多少分
            s: parseInt(String(t2)) <= 0 ? '00' : String(parseInt(String(t2))).padStart(2, '0'), //还剩多少秒
        }
        if (this.type == 1) {
            // @ts-ignore
            return this.ft.replace(/d|h{1,2}|m{1,2}|s{1,2}|S/g, (a:string) => a[0] === 'd' || a.length === 2 ? date[a[0]] : Number(date[a[0]]))
        } else {
            item['d'] = date.d
            item['h'] = date.h
            item['m'] = date.m
            item['s'] = date.s
        }
    }
    operation(type: number) {
        if (type == 0) { //cancel
            clearInterval(this.timer)
            this.timer = null
        } else if (type == 1) { //update
            this.timer && clearInterval(this.timer)
            this.timer = setInterval(() => {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.type === 1) {
                        this.list[i].end = this.calc(this.list[i])
                    } else {
                        this.calc(this.list[i])
                    }
                }
            }, 1000)
        }
    }
}