import os
import subprocess
import sys
from pathlib import Path
from typing import Optional, Tuple

class ReactTSProjectManager:
    def __init__(self):
        self.project_root = self.find_project_root()
        
    def find_project_root(self) -> Path:
        """Busca el directorio raíz del proyecto (contiene package.json)"""
        current = Path.cwd()
        while current != current.parent:
            if (current / "package.json").exists():
                return current
            current = current.parent
        return Path.cwd()

    def run_npm_command(self, command: str) -> Tuple[bool, str]:
        """Ejecuta un comando npm en el directorio del proyecto"""
        try:
            result = subprocess.run(
                ["npm", *command.split()],
                cwd=self.project_root,
                capture_output=True,
                text=True,
                shell=True,
                check=True
            )
            return True, result.stdout
        except subprocess.CalledProcessError as e:
            return False, e.stderr

    def create_component(self, name: str) -> Tuple[bool, str]:
        """Crea un componente React TypeScript con estructura moderna"""
        try:
            components_dir = self.project_root / "src" / "components"
            component_dir = components_dir / name
            component_dir.mkdir(parents=True, exist_ok=True)
            
            # Componente principal
            (component_dir / f"{name}.tsx").write_text(f"""import {{ cn }} from '@/lib/utils';
import React from 'react';

interface {name}Props {{
  className?: string;
  children?: React.ReactNode;
}}

export function {name}({{ className, children }}: {name}Props) {{
  return (
    <div className={{cn('{name.lower()}-container', className)}}>
      {{children}}
    </div>
  );
}}
""", encoding='utf-8')
            
            # Archivo de índice
            (component_dir / "index.ts").write_text(f"export * from './{name}';\n", encoding='utf-8')
            
            # Archivo de estilos (opcional)
            (component_dir / f"{name}.module.css").write_text(f".{name.lower()}-container {{\n  /* Estilos aquí */\n}}", encoding='utf-8')
            
            return True, f"✅ Componente {name} creado en {component_dir.relative_to(self.project_root)}"
        except Exception as e:
            return False, f"❌ Error al crear componente: {str(e)}"

def setup_project_environment(manager: ReactTSProjectManager):
    """Configura el entorno del proyecto"""
    print("\n🔍 Analizando proyecto...")
    print(f"📂 Directorio del proyecto: {manager.project_root}")
    
    if not (manager.project_root / "package.json").exists():
        print("⚠ No se encontró package.json. Algunas funciones pueden no trabajar correctamente.")
    
    # Verificar estructura de directorios
    required_dirs = ["src/components", "src/lib", "src/hooks"]
    for dir_path in required_dirs:
        full_path = manager.project_root / dir_path
        if not full_path.exists():
            full_path.mkdir(parents=True, exist_ok=True)
            print(f"📁 Directorio creado: {dir_path}")

def main_menu(manager: ReactTSProjectManager):
    """Menú interactivo principal"""
    while True:
        print("\n" + "="*50)
        print("🛠️  MENÚ PRINCIPAL - REACT + TYPESCRIPT")
        print("="*50)
        print(f"📦 Proyecto: {manager.project_root.name}")
        print("\nOpciones:")
        print("1. 📥 Instalar dependencias (npm install)")
        print("2. 🆕 Crear nuevo componente")
        print("3. 🚀 Ejecutar servidor de desarrollo (npm run dev)")
        print("4. 🏗️  Crear estructura de proyecto completa")
        print("5. 🚪 Salir")
        
        choice = input("\n👉 Selecciona una opción (1-5): ").strip()
        
        if choice == "1":
            print("\nInstalando dependencias...")
            success, message = manager.run_npm_command("install")
            print("✅ Operación completada" if success else "❌ Error")
            print(message)
        
        elif choice == "2":
            component_name = input("\nIngrese el nombre del componente (ej. Button): ").strip()
            if component_name:
                success, message = manager.create_component(component_name)
                print(message)
            else:
                print("❌ Debes especificar un nombre válido")
        
        elif choice == "3":
            print("\nIniciando servidor de desarrollo...")
            success, message = manager.run_npm_command("run dev")
            print(message)
            if success:
                break  # Salir del menú cuando el servidor está corriendo
        
        elif choice == "4":
            print("\nCreando estructura de proyecto...")
            setup_project_environment(manager)
            print("✅ Estructura básica creada")
        
        elif choice == "5":
            print("\n👋 ¡Hasta luego!")
            break
        
        else:
            print("❌ Opción no válida. Intenta nuevamente.")

if __name__ == "__main__":
    print("\n" + "="*50)
    print("🚀 AGENTE DE DESARROLLO REACT + TYPESCRIPT")
    print("="*50)
    
    # Verificar Node.js/npm
    try:
        subprocess.run(["node", "--version"], check=True, capture_output=True)
        subprocess.run(["npm", "--version"], check=True, capture_output=True)
    except Exception:
        print("❌ Error: Node.js y npm deben estar instalados y en el PATH")
        print("Descarga Node.js desde: https://nodejs.org/")
        sys.exit(1)
    
    manager = ReactTSProjectManager()
    setup_project_environment(manager)
    main_menu(manager)