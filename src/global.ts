import { FloatArray, IndicesArray, Mesh, Vector3 } from "@babylonjs/core";

type MeshArray = Mesh[];

export class global {
  // array stores all units of 2 team
  static arrUnits: [MeshArray, MeshArray];

  // Character Shape
  static MeshPos: FloatArray;
  static MeshNormals: FloatArray;
  static MeshIndices: IndicesArray;
}

export class KNIGHT {
  static cost = 15;
  static count = 0;
  static max_count = 30;
}

export class ARCHER {
  static cost = 15;
  static count = 0;
  static max_count = 30;
}

export class CASTLE {
  static max_health: number = 100;
  static damage: number = 10;
  // Position of p1 castle and p2 castle
  static positions: Vector3[] = [new Vector3(-5, 0, 0), new Vector3(5, 0, 0)];
  // Health status of p1 castle and p2 castle
  static healths: number[] = [CASTLE.max_health, CASTLE.max_health];
}

export {};
