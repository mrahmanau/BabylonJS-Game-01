import {
  MeshBuilder,
  Vector3,
  Scene,
  PhysicsImpostor,
  Mesh,
} from "@babylonjs/core";

export class Projectile {
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  spawnSphere(position: Vector3) {
    // Create a sphere to represent the projectile
    const sphere = MeshBuilder.CreateSphere(
      "sphereProjectile",
      { diameter: 0.5 },
      this.scene
    );
    sphere.position = position;

    // Add physics to the sphere for movement
    sphere.physicsImpostor = new PhysicsImpostor(
      sphere,
      PhysicsImpostor.SphereImpostor,
      { mass: 1 }
    );

    // You can add movement logic here for the projectile
    this.moveProjectile(sphere, new Vector3(0, 0, 1)); // Example direction
    console.log("Sphere projectile spawned at: ", position);
  }

  spawnArrow(position: Vector3) {
    // Create a cylinder to represent the arrow
    const arrow = MeshBuilder.CreateCylinder(
      "arrowProjectile",
      { diameter: 0.1, height: 1 },
      this.scene
    );
    arrow.position = position;
    arrow.rotation.x = Math.PI / 2; // Rotate the arrow to point upwards

    // Add physics to the arrow for movement
    arrow.physicsImpostor = new PhysicsImpostor(
      arrow,
      PhysicsImpostor.CylinderImpostor,
      { mass: 1 }
    );

    // You can add movement logic here for the projectile
    this.moveProjectile(arrow, new Vector3(0, 0, 1)); // Example direction
    console.log("Arrow projectile spawned at: ", position);
  }

  private moveProjectile(projectile: Mesh, direction: Vector3) {
    // Set the projectile's velocity
    projectile.physicsImpostor.setLinearVelocity(direction.scale(10)); // Speed can be adjusted
  }
}
