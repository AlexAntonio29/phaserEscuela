export function empujar(sujetoEmpujador, sujetoEmpujado, contacto ,listaContacto, scene,force=600,movCamara=true) {

if(!listaContacto[contacto]){

  const empujado = sujetoEmpujado;
  const empujador = sujetoEmpujador;
  if (!empujado || !empujado.body) {
    console.warn("Jugador o body indefinido en empujarJugador");
    return;
  }

  // Asegurar propiedades físicas
  const cuerpo = empujado.body;
  cuerpo.setImmovable(false);
  cuerpo.moves = true;
  cuerpo.setAllowGravity(false);
  empujado.setBounce(0);
  cuerpo.setMaxVelocity(1200, 1200);

  // Vector normalizado
  const dx = empujado.x - empujador.x;
  const dy = empujado.y - empujador.y;
  const magnitud = Math.sqrt(dx*dx + dy*dy) || 1;
  const nx = dx / magnitud;
  const ny = dy / magnitud;

  const fuerza = force; // ajusta si se siente poco o mucho

  console.log("Aplicando empuje:", nx, ny, "magnitud:", magnitud);

  // Forzar que no esté bloqueado en ambos ejes antes de aplicar
  if (cuerpo.blocked.none === false) {
    console.log("Jugador bloqueado:", cuerpo.blocked);
    // si está bloqueado, aplicamos una pequeña corrección en el eje libre
    if (cuerpo.blocked.left) cuerpo.setVelocity(Math.abs(fuerza*0.5), cuerpo.velocity.y);
    if (cuerpo.blocked.right) cuerpo.setVelocity(-Math.abs(fuerza*0.5), cuerpo.velocity.y);
    if (cuerpo.blocked.up) cuerpo.setVelocity(cuerpo.velocity.x, Math.abs(fuerza*0.5));
    if (cuerpo.blocked.down) cuerpo.setVelocity(cuerpo.velocity.x, -Math.abs(fuerza*0.5));
  } else {
    cuerpo.setVelocity(nx * fuerza, ny * fuerza);
  }

  listaContacto[contacto] = true;//

  // Frenado progresivo pero con checks para blocked
  scene.time.delayedCall(120, () => {
    if (cuerpo) cuerpo.setVelocity(cuerpo.velocity.x * 0.5, cuerpo.velocity.y * 0.5);
  });

  scene.time.delayedCall(300, () => {
    if (cuerpo) {
      cuerpo.setVelocity(0, 0);
      listaContacto[contacto] = false;
      //empujado.setBounce(1); // si quieres restaurarlo
    }
  });
  if(movCamara)
  scene.cameras.main.shake(80, 0.01);
}
}