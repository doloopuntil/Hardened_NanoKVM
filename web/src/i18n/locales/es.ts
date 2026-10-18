const es = {
  translation: {
    common: {
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      actionFailed: 'La operación ha fallado',
      loading: 'Cargando la configuración del dispositivo...',
      loadFailed: 'No se pudo cargar la configuración del dispositivo',
      retry: 'Reintentar'
    },
    head: {
      desktop: 'Escritorio remoto',
      login: 'Inicio de sesión',
      changePassword: 'Cambiar contraseña',
      terminal: 'Consola',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Iniciar sesión',
      placeholderUsername: 'Introduce tu nombre de usuario',
      placeholderPassword: 'Introduce tu contraseña',
      placeholderPassword2: 'Introduce tu contraseña de nuevo',
      noEmptyUsername: 'El nombre de usuario no puede estar vacío',
      noEmptyPassword: 'La contraseña no puede estar vacía',
      invalidUser: 'Nombre de usuario o contraseña incorrectos',
      locked: 'Demasiados inicios de sesión, inténtalo de nuevo más tarde',
      globalLocked: 'Sistema bajo protección, inténtelo nuevamente más tarde',
      error: 'Error inesperado',
      changePassword: 'Cambiar contraseña',
      differentPassword: 'Las contraseñas no coinciden',
      forgetPassword: 'Contraseña olvidada',
      ok: 'Aceptar',
      cancel: 'Cancelar',
      loginButtonText: 'Iniciar sesión',
      tips: {
        change1: 'Ten en cuenta que esta acción cambiará las siguientes contraseñas:',
        change2: 'Contraseña de acceso web'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Configura el Wi-Fi para el NanoKVM',
      confirmBtn: 'Aceptar',
      finishBtn: 'Finalizado',
      ap: {
        authTitle: 'Autenticación requerida',
        authDescription: 'Por favor ingrese la contraseña AP para continuar',
        authFailed: 'Contraseña AP no válida',
        passPlaceholder: 'AP contraseña',
        verifyBtn: 'Verificar'
      }
    },
    screen: {
      scale: 'Escala',
      title: 'Pantalla',
      video: 'Modo de vídeo',
      resolution: 'Resolución',
      auto: 'Automático',
      fps: 'FPS',
      customizeFps: 'Personalizar',
      quality: 'Calidad',
      qualityLossless: 'Sin pérdida',
      qualityHigh: 'Alto',
      qualityMedium: 'Medio',
      qualityLow: 'Bajo',
      frameDetect: 'Detectar fotogramas',
      frameDetectTip:
        'Calcula la diferencia entre fotogramas. Para de transmitir vídeo cuando no se detectan cambios en la pantalla del host remoto.',
      resetHdmi: 'Reiniciar HDMI',
      webrtcConnectionFailed: {
        title: 'Error de conexión de WebRTC'
      },
      captureStatus: {
        hdmiError: 'Error de imagen HDMI',
        unsupportedResolution: 'La resolución actual no es compatible',
        retrieving: 'Obteniendo pantalla...',
        changingResolution: 'Cambiando resolución...',
        updateFailed: 'La pantalla no puede actualizarse ahora',
        videoError: 'Error de visualización de video',
        noHdmi: 'No se detectó señal HDMI',
        unavailable: 'La pantalla no puede mostrarse ahora'
      }
    },
    keyboard: {
      title: 'Teclado',
      paste: 'Pegar',
      tips: 'Sólo están soportadas las letras y símbolos estándar del teclado',
      placeholder: 'Por favor, introduce el texto',
      virtual: 'Teclado virtual',
      readClipboard: 'Leer del portapapeles',
      clipboardPermissionDenied:
        'Permiso de portapapeles denegado. Por favor, permite el acceso al portapapeles en tu navegador.',
      clipboardReadError: 'Error al leer del portapapeles',
      dropdownEnglish: 'Inglés',
      dropdownGerman: 'Alemán',
      dropdownFrench: 'Francés',
      shortcut: {
        title: 'Atajos',
        custom: 'Personalizado',
        clear: 'Borrar',
        save: 'Guardar'
      },
      leaderKey: {
        title: 'Tecla líder',
        howToUse: 'Cómo utilizar',
        simultaneous: {
          title: 'Modo Simultáneo',
          desc1: 'Mantenga pulsada la tecla líder y luego pulse el atajo.',
          desc2: 'Intuitivo, pero puede entrar en conflicto con los atajos del sistema.'
        },
        sequential: {
          title: 'Modo Secuencial',
          desc2: 'Requiere más pasos, pero evita por completo conflictos del sistema.'
        },
        enable: 'Habilitar tecla líder',
        tip: 'Al asignarse como tecla líder, esta tecla funciona únicamente como activador de atajos y pierde su comportamiento predeterminado.',
        shiftRight: 'Shift derecho',
        ctrlRight: 'Ctrl derecho',
        metaRight: 'Win derecho',
        recorder: {
          rec: 'REC',
          activate: 'Activar teclas',
          input: 'Por favor presione el atajo...'
        }
      }
    },
    mouse: {
      title: 'Ratón',
      cursor: 'Estilo de cursor',
      default: 'Cursor por defecto',
      cell: 'Cursor de celda',
      text: 'Cursor de texto',
      grab: 'Cursor de agarre',
      hide: 'Ocultar cursor',
      mode: 'Modo de ratón',
      absolute: 'Modo absoluto',
      relative: 'Modo relativo',
      direction: 'Dirección de la rueda de desplazamiento',
      scrollUp: 'Desplazarse hacia arriba',
      scrollDown: 'Desplácese hacia abajo',
      speed: 'Velocidad de la rueda de desplazamiento',
      fast: 'Rápida',
      slow: 'Lenta',
      requestPointer:
        'Usando modo relativo. Por favor, haz clic en el escritorio para obtener el cursor del ratón.',
      resetHid: 'Restablecer HID',
      hidOnly: {
        title: 'Modo solo HID',
        tip1: 'Habilitar el modo sólo HID desmontará el disco virtual y la red virtual',
        tip2: 'En modo sólo HID, el montaje de imágenes está deshabilitado',
        tip3: 'El NanoKVM se reiniciará automáticamente después de cambiar de modo',
        enable: 'Habilitar modo sólo HID',
        disable: 'Desactivar modo sólo HID'
      }
    },
    image: {
      title: 'Imágenes',
      loading: 'Cargando...',
      empty: 'No se ha encontrado nada',
      mountMode: 'Modo de montaje',
      mountFailed: 'Fallo al montar',
      diskOnWarn:
        'Montar la imagen desactiva el disco virtual, por lo que el equipo ya no puede acceder a /data. ¿Continuar?',
      diskOffWarn:
        'El disco virtual está desactivado y hay que activarlo para montar la imagen. Los dispositivos USB del equipo se enumeran de nuevo. ¿Continuar?',
      unmountFailed: 'Fallo al desmontar',
      forceEject: 'Forzar expulsión',
      forceEjectConfirm:
        'El host ha bloqueado la unidad óptica. Forzar la expulsión desconecta el dispositivo USB virtual durante un momento, por lo que el teclado y el ratón pueden desconectarse brevemente. ¿Continuar?',
      deleteConfirm: '¿Estás seguro de que deseas eliminar esta imagen?',
      tips: {
        title: 'Cómo subir imágenes',
        usb1: 'Conecta el NanoKVM a tu computadora mediante USB.',
        usb3: 'Abre el disco virtual en tu computadora y copia el archivo de imagen en el directorio raíz del disco virtual.',
        scp1: 'Asegúrate de que el NanoKVM y tu computadora estén en la misma red local.',
        scp2: 'Abre una terminal en tu computadora y usa el comando SCP para subir el archivo de imagen al directorio /data en el NanoKVM.',
        scp3: 'Ejemplo: scp tu-ruta-de-imagen root@tu-ip-del-nanokvm:/data',
        tfCard: 'Tarjeta SD',
        tf1: 'Este método es compatible con el sistema Linux',
        tf3: 'Inserta la tarjeta SD en un lector de tarjetas y conéctalo a tu computadora.',
        tf4: 'Copia el archivo de imagen en el directorio /data de la tarjeta SD.',
        tf5: 'Inserta la tarjeta SD en el NanoKVM.'
      }
    },
    script: {
      title: 'Script',
      upload: 'Subir',
      run: 'Ejecutar',
      runBackground: 'Ejecutar en segundo plano',
      runFailed: 'Ejecución fallida',
      delDesc: '¿Estás seguro de que deseas eliminar este archivo?',
      delete: 'Eliminar',
      close: 'Cerrar'
    },
    terminal: {
      title: 'Consola',
      nanokvm: 'Consola del NanoKVM',
      serial: 'Consola del Puerto Serie',
      serialPort: 'Puerto Serie',
      serialPortPlaceholder: 'Por favor, introduce el puerto serie',
      baudrate: 'Tasa de baudios',
      parity: 'Paridad',
      parityNone: 'Ninguna',
      parityEven: 'Par',
      parityOdd: 'Impar',
      flowControl: 'Control de flujo',
      flowControlNone: 'Ninguno',
      flowControlSoft: 'Software',
      flowControlHard: 'Hardware',
      dataBits: 'Bits de datos',
      stopBits: 'Bits de parada'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'Enviando comando...',
      sent: 'Comando enviado',
      input: 'Por favor, introduce la dirección MAC',
      ok: 'Aceptar'
    },
    download: {
      title: 'Descargador de imágenes',
      input: 'Por favor, introduce la URL de una imagen remota',
      ok: 'Aceptar',
      mountedImage:
        'Esta imagen está montada. Desmóntela antes de subir un archivo con el mismo nombre.',
      diskOff: 'Desactivar el disco virtual',
      uploadbox: 'Suelte el archivo aquí o haga clic para seleccionar',
      inputfile: 'Por favor ingrese el archivo de imagen',
      NoISO: 'Sin ISO',
      invalidSHA256: 'SHA-256 debe ser una cadena hexadecimal de 64 caracteres',
      checksumFailed: 'Descarga fallida: error en la verificación SHA-256'
    },
    power: {
      title: 'Encender / Apagar',
      showConfirm: 'Confirmación',
      showConfirmTip: 'Las operaciones de encendido requieren confirmación adicional',
      reset: 'Reiniciar',
      resetConfirm: '¿Desea proceder con la operación de reinicio?',
      powerConfirm: '¿Desea proceder con la operación de encendido?',
      okBtn: 'Sí',
      cancelBtn: 'No'
    },
    settings: {
      title: 'Ajustes',
      about: {
        title: 'Sobre NanoKVM',
        information: 'Información',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Versión de la aplicación',
        applicationTip: 'Versión de la aplicación web NanoKVM',
        community: 'Comunidad',
        hostname: 'Nombre del host',
        hostnameUpdated: 'Nombre del host actualizado. Reinicia para aplicar.',
        ipType: {}
      },
      appearance: {
        title: 'Apariencia',
        display: 'Pantalla',
        language: 'Idioma',
        languageDesc: 'Seleccionar el idioma de la interfaz',
        webTitle: 'Título web',
        webTitleDesc: 'Personaliza el título de la página web',
        menuBar: {
          title: 'Barra de menú',
          mode: 'Modo de visualización',
          modeDesc: 'Mostrar barra de menú en la pantalla',
          modeOff: 'Apagado',
          modeAuto: 'Ocultar automáticamente',
          modeAlways: 'Siempre visible',
          keyboardLedStatus: 'Indicadores de bloqueo del teclado',
          keyboardLedStatusDesc:
            'Mostrar el estado de Bloq Num, Bloq Mayús y Bloq Despl del equipo remoto',
          icons: 'Iconos del submenú',
          iconsDesc: 'Mostrar iconos de submenú en la barra de menú'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Estado de bloqueos del teclado remoto',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Bloq Num',
        numLockShort: 'Num',
        capsLock: 'Bloq Mayús',
        capsLockShort: 'May',
        scrollLock: 'Bloq Despl',
        scrollLockShort: 'Despl',
        on: 'Activado',
        off: 'Desactivado',
        unknown: 'Desconocido'
      },
      device: {
        title: 'Dispositivo',
        oled: {
          title: 'OLED',
          description: 'La pantalla OLED entra en reposo automáticamente'
        },
        ssh: {
          description: 'Habilitar acceso remoto SSH'
        },
        swap: {
          title: 'Memoria Swap',
          description: 'Establece el tamaño del archivo swap'
        },
        mouseJiggler: {
          title: 'Mouse Jiggler',
          description: 'Evitar que el host remoto entre en reposo',
          disable: 'Desactivar',
          absolute: 'Modo absoluto',
          relative: 'Modo relativo'
        },
        mdns: {
          description: 'Habilitar servicio de descubrimiento mDNS',
          tip: 'Desactívalo si no es necesario'
        },
        hdmi: {
          description: 'Habilitar salida HDMI/monitor',
          idleTimeoutTitle: 'Tiempo de espera de captura inactiva',
          idleTimeoutDescription:
            'Detener la captura HDMI después de no haber espectadores activos durante'
        },
        hidOnly: 'Modo sólo HID',
        disk: 'Disco Virtual',
        network: 'Red Virtual',
        networkDesc: 'Montar tarjeta de red virtual en el host remoto',
        reboot: 'Reiniciar',
        rebootDesc: '¿Estás seguro de que deseas reiniciar el NanoKVM?'
      },
      network: {
        title: 'Red',
        wifi: {
          title: 'Wi-Fi',
          description: 'Configura el Wi-Fi',
          apMode: 'El modo AP está activado; conéctate al Wi-Fi escaneando el código QR',
          connect: 'Conectar Wi-Fi',
          connectDesc1: 'Introduce el SSID de la red y la contraseña',
          disconnect: '¿Seguro que quieres desconectar la red?',
          ssid: 'Nombre',
          password: 'Contraseña',
          joinBtn: 'Unirse',
          cancelBtn: 'Cancelar'
        },
        tls: {
          description: 'Habilitar protocolo HTTPS'
        },
        dns: {
          title: 'DNS',
          description: 'Configura los servidores DNS para NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'Configurar direccionamiento IPv4 para la interfaz cableada',
          dhcp: 'DHCP',
          manual: 'Manual',
          apply: 'Aplicar',
          invalid: 'Introduce una dirección IPv4 o IPv6 válida',
          invalidNetwork: 'Introduce una dirección IPv4, máscara de subred y router válidos',
          saved: 'Configuración DNS guardada',
          redirecting: 'Configuración de red guardada. Abriendo la nueva dirección...',
          saveFailed: 'No se pudo guardar la configuración DNS',
          unsaved: 'Cambios sin guardar',
          maxServers: 'Se permiten como máximo {{count}} servidores DNS',
          dhcpServersDescription: 'Los servidores DNS se obtienen automáticamente por DHCP',
          interface: 'Interfaz',
          ipAddress: 'Dirección IP',
          subnetMask: 'Máscara de subred',
          router: 'Router'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Optimización de memoria',
          tip: 'Cuando el uso de memoria supera el límite, la recolección de basura se ejecuta de forma más agresiva para intentar liberar memoria. Es necesario reiniciar Tailscale para que el cambio surta efecto.'
        },
        swap: {
          title: 'Memoria Swap',
          tip: 'Si los problemas persisten después de habilitar la optimización de memoria, prueba a activar la memoria swap. Esto establece el tamaño del archivo swap en 256 MB por defecto, que se puede ajustar en "Ajustes > Dispositivo".'
        },
        restart: '¿Seguro que deseas reiniciar Tailscale?',
        stop: '¿Seguro que deseas detener Tailscale?',
        loading: 'Cargando...',
        install: 'Instalar',
        installing: 'Instalando',
        failed: 'La instalación falló',
        download: 'Descargar el',
        package: 'paquete de instalación',
        unzip: 'y descomprimirlo',
        upTailscale: 'Sube tailscale al directorio /usr/bin/ del NanoKVM',
        upTailscaled: 'Sube tailscaled al directorio /usr/sbin/ del NanoKVM',
        refresh: 'Actualizar la página actual',
        notRunning: 'Tailscale no se está ejecutando. Por favor, inícialo para continuar.',
        run: 'Iniciar',
        notLogin:
          'El dispositivo aún no ha sido vinculado. Por favor, inicia sesión y vincula este dispositivo a tu cuenta.',
        urlPeriod: 'Esta URL es válida por 10 minutos',
        login: 'Iniciar sesión',
        loginSuccess: 'Inicio de sesión exitoso',
        deviceName: 'Nombre del dispositivo',
        deviceIP: 'IP del dispositivo',
        account: 'Cuenta',
        logout: 'Cerrar sesión',
        logoutDesc: '¿Estás seguro de que deseas cerrar sesión?',
        uninstall: 'Desinstalar Tailscale',
        uninstallDesc: '¿Estás seguro de que deseas desinstalar Tailscale?',
        okBtn: 'Sí',
        cancelBtn: 'No'
      },
      update: {
        title: 'Buscar actualizaciones',
        queryFailed: 'Error al obtener la versión',
        updateFailed: 'La actualización falló. Por favor, inténtalo de nuevo.',
        isLatest: 'Ya tienes la última versión.',
        available: 'Hay una actualización disponible. ¿Estás seguro de que quieres actualizar?',
        updating: 'Actualización iniciada. Por favor, espera...',
        confirm: 'Confirmar',
        cancel: 'Cancelar',
        preview: 'Vista previa de actualizaciones',
        previewTip:
          'Ten en cuenta que las versiones de vista previa pueden contener errores o funcionalidades incompletas',
        offline: {
          title: 'Actualizaciones sin conexión',
          desc: 'Actualización a través del paquete de instalación local',
          upload: 'Subir',
          updateFailed: 'La actualización falló. Por favor, inténtalo de nuevo.'
        }
      },
      account: {
        title: 'Cuenta',
        webAccount: 'Nombre de la cuenta web',
        password: 'Contraseña',
        updateBtn: 'Actualizar',
        logoutBtn: 'Cerrar sesión',
        logoutDesc: '¿Estás seguro de que deseas cerrar sesión?',
        okBtn: 'Sí',
        cancelBtn: 'No'
      }
    },
    picoclaw: {
      title: 'PicoClaw Asistente',
      inputPlaceholder: 'Describe lo que quieres que haga el PicoClaw',
      newConversation: 'Nueva conversación',
      processing: 'Procesando...',
      agent: {
        defaultTitle: 'Asistente general',
        kvmTitle: 'Control remoto',
        switched: 'Rol de agente cambiado',
        switchFailed: 'No se pudo cambiar la función del agente'
      },
      send: 'Enviar',
      cancel: 'Cancelar',
      status: {
        connecting: 'Conectándose a la puerta de enlace...',
        connected: 'Sesión de PicoClaw conectada',
        disconnected: 'Sesión de PicoClaw cerrada',
        stopped: 'Solicitud de detención enviada',
        runtimeStarted: 'Tiempo de ejecución de PicoClaw iniciado',
        runtimeStartFailed: 'Error al iniciar el tiempo de ejecución de PicoClaw',
        runtimeStopped: 'Tiempo de ejecución de PicoClaw detenido',
        runtimeStopFailed: 'No se pudo detener el tiempo de ejecución de PicoClaw'
      },
      connection: {
        runtime: {
          checking: 'Comprobando',
          ready: 'Tiempo de ejecución listo',
          stopped: 'Tiempo de ejecución detenido',
          unavailable: 'Tiempo de ejecución no disponible',
          configError: 'Error de configuración'
        },
        transport: {
          connecting: 'Conectando',
          connected: 'Conectado'
        },
        run: {
          idle: 'Inactivo',
          busy: 'Ocupado'
        }
      },
      message: {
        toolAction: 'Acción',
        observation: 'Observación',
        screenshot: 'Captura de pantalla'
      },
      overlay: {
        locked: 'PicoClaw está controlando el dispositivo. La entrada manual está en pausa.'
      },
      install: {
        install: 'Instalar PicoClaw',
        installing: 'Instalando PicoClaw',
        success: 'PicoClaw instalado correctamente',
        failed: 'Error al instalar PicoClaw',
        uninstalling: 'Desinstalando el tiempo de ejecución...',
        requiredTitle: 'PicoClaw no está instalado',
        requiredDescription:
          'Instala PicoClaw antes de iniciar el tiempo de ejecución de PicoClaw.',
        progressDescription: 'PicoClaw se está descargando e instalando.',
        stages: {
          preparing: 'Preparando',
          downloading: 'Descargando',
          extracting: 'Extrayendo',
          verifying: 'Verificando',
          installing: 'Instalando',
          installed: 'Instalado',
          install_timeout: 'Tiempo de espera agotado',
          install_failed: 'Falló'
        }
      },
      model: {
        requiredTitle: 'Se requiere configuración del modelo',
        docsTitle: 'Guía de configuración',
        docsDesc: 'Modelos y protocolos compatibles',
        menuLabel: 'Configurar modelo',
        modelIdentifier: 'Identificador de modelo',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'Clave API',
        save: 'Guardar',
        saving: 'Guardando',
        saved: 'Configuración del modelo guardada',
        saveFailed: 'No se pudo guardar la configuración del modelo',
        invalid: 'Se requieren el identificador del modelo, API Base URL y la clave API'
      },
      uninstall: {
        menuLabel: 'Desinstalar',
        confirmTitle: 'Desinstalar PicoClaw',
        confirmContent:
          '¿Está seguro de que desea desinstalar PicoClaw? Esto eliminará el ejecutable y todos los archivos de configuración.',
        confirmOk: 'Desinstalar'
      },
      history: {
        title: 'Historial',
        loading: 'Cargando sesiones...',
        emptyTitle: 'Aún no hay historial',
        emptyDescription: 'Las sesiones PicoClaw anteriores aparecerán aquí.',
        loadFailed: 'Error al cargar el historial de sesiones',
        deleteFailed: 'No se pudo eliminar la sesión',
        deleteConfirmTitle: 'Eliminar sesión',
        deleteConfirmContent: '¿Está seguro de que desea eliminar "{{title}}"?',
        deleteConfirmOk: 'Eliminar',
        messageCount_one: '{{count}} mensaje',
        messageCount_other: '{{count}} mensajes'
      },
      config: {
        startRuntime: 'Iniciar PicoClaw',
        stopRuntime: 'Detener PicoClaw'
      },
      start: {
        title: 'Iniciar PicoClaw',
        description: 'Inicia el tiempo de ejecución para comenzar a utilizar el asistente PicoClaw.'
      }
    },
    error: {
      title: 'Hemos encontrado un problema',
      refresh: 'Actualizar'
    },
    fullscreen: {
      toggle: 'Activar/Desactivar pantalla completa'
    },
    menu: {
      collapse: 'Colapsar menú'
    }
  }
};

export default es;
