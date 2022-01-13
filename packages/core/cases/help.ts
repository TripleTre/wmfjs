import { ColorRef, META_DELETEOBJECT, META_SELECTOBJECT } from "../src/index";

export function selectObject(index: number): META_SELECTOBJECT {
    const record = new META_SELECTOBJECT();
    record.objectIndex = index;
    return record;
}

export function deleteObject(index: number): META_SELECTOBJECT {
    const record = new META_DELETEOBJECT();
    record.objectIndex = index;
    return record;
}

export const strokeColor = new ColorRef();
strokeColor.r = 0;
strokeColor.g = 150;
strokeColor.b = 136;

export const fillColor = new ColorRef();
fillColor.r = 255;
fillColor.g = 152;
fillColor.b = 0;

export const mainColor = new ColorRef()
mainColor.r = 139;
mainColor.g = 195;
mainColor.b = 74;
