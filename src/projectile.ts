import { MeshBuilder, Vector3, Scene } from "@babylonjs/core";

export class Projectile {
  constructor(private scene: Scene) {}

  spawnArrow(startPosition: Vector3, targetPosition: Vector3) {
    const arrow = MeshBuilder.CreateCylinder(
      "arrow",
      { diameter: 0.1, height: 2 },
      this.scene
    );
    arrow.position = startPosition;

    // Calculate the direction to the target
    const direction = targetPosition.subtract(startPosition).normalize();
    const distance = Vector3.Distance(startPosition, targetPosition);

    // Move the arrow towards the target
    arrow.position.addInPlace(direction.scale(distance));
    arrow.rotation.y = Math.atan2(direction.x, direction.z); // Align the arrow with the direction

    // Optional: You can add logic for animating the projectile's flight
    console.log("Arrow spawned from", startPosition, "to", targetPosition);
  }

  spawnSphere(startPosition: Vector3, targetPosition: Vector3) {
    const sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 0.5 },
      this.scene
    );
    sphere.position = startPosition;

    // Calculate the direction to the target
    const direction = targetPosition.subtract(startPosition).normalize();
    const distance = Vector3.Distance(startPosition, targetPosition);

    // Move the sphere towards the target
    sphere.position.addInPlace(direction.scale(distance));

    // Optional: You can add logic for animating the projectile's flight
    console.log("Sphere spawned from", startPosition, "to", targetPosition);
  }
}
