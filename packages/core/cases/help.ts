import { META_DELETEOBJECT, META_SELECTOBJECT } from "../src/index";

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
