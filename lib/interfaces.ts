export interface LayoutItem {
    layout: {[layoutName: string]: string[]};
    layoutCandidates?: {key: string, value: string}
}

export interface LayoutItemObj {
    [layoutName: string] : LayoutItem;
}