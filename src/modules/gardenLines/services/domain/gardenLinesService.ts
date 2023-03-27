import GardenLine from "./model/gardenLine";
import {insertNewGardenLine} from "../database/gardenLinesDatabaseRequestRepository";

export function newGardenLineInsertion(line: GardenLine) {
    return insertNewGardenLine(line.toDTO());
}