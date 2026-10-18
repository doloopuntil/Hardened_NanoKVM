const ca = {
  translation: {
    common: {
      confirm: 'Confirma',
      cancel: 'Cancel·la',
      delete: 'Esborra',
      actionFailed: "L'operació ha fallat",
      loading: 'Carregant la configuració del dispositiu...',
      loadFailed: "No s'ha pogut carregar la configuració del dispositiu",
      retry: 'Reintenta'
    },
    head: {
      desktop: 'Escriptori remot',
      login: 'Inici de sessió',
      changePassword: 'Canviar contrasenya',
      terminal: 'Terminal',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Inici de sessió',
      placeholderUsername: "Nom d'usuari",
      placeholderPassword: 'Contrasenya',
      placeholderPassword2: 'Torna a introduir la contrasenya',
      noEmptyUsername: "Cal introduir el nom d'usuari",
      noEmptyPassword: 'Cal introduir la contrasenya',
      invalidUser: "Nom d'usuari o contrasenya invàlids",
      locked: 'Massa inicis de sessió, si us plau, torna-ho a provar més tard',
      error: 'Error inesperat',
      changePassword: 'Canviar la contrasenya',
      differentPassword: 'Les contrasenyes no coincideixen',
      illegalUsername: "El nom d'usuari conté caràcters no permesos",
      forgetPassword: 'Has oblidat la contrasenya',
      ok: "D'acord",
      cancel: 'Cancel·la',
      loginButtonText: 'Inicia sessió',
      tips: {
        change1: 'Aquesta acció canviarà les següents contrasenyes:',
        change2: "Contrasenya d'inici de sessió web"
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Configura Wi-Fi per al NanoKVM',
      confirmBtn: "D'acord",
      finishBtn: 'Fet',
      ap: {
        authTitle: 'Es requereix autenticació',
        authFailed: 'Contrasenya AP no vàlida',
        passPlaceholder: 'AP contrasenya',
        verifyBtn: 'Verificar'
      }
    },
    screen: {
      scale: 'Escala',
      title: 'Pantalla',
      video: 'Mode de vídeo',
      resolution: 'Resolució',
      auto: 'Automàtic',
      autoTips:
        "Poden aparèixer talls o desajustos del ratolí en certes resolucions. Prova a canviar la resolució de l'amfitrió remot o desactiva el mode automàtic.",
      fps: 'FPS',
      customizeFps: 'Personalitzat',
      quality: 'Qualitat',
      qualityLossless: 'Sense pèrdua',
      qualityHigh: 'Alta',
      qualityMedium: 'Mitjana',
      qualityLow: 'Baixa',
      frameDetect: 'Detecció de fotogrames',
      frameDetectTip:
        "Calcula la diferència entre fotogrames. S'atura la transmissió si no hi ha canvis a la pantalla de l'amfitrió remot.",
      resetHdmi: 'Restablir HDMI',
      webrtcConnectionFailed: {
        title: 'Error de connexió WebRTC'
      },
      captureStatus: {
        hdmiError: 'Error a la pantalla HDMI',
        unsupportedResolution: 'La resolució actual no és compatible',
        retrieving: "S'està obtenint la pantalla...",
        changingResolution: "S'està canviant la resolució...",
        updateFailed: 'La pantalla no es pot actualitzar ara',
        videoError: 'Error de visualització de vídeo',
        noHdmi: "No s'ha detectat cap senyal HDMI",
        unavailable: 'La pantalla no es pot mostrar ara'
      }
    },
    keyboard: {
      title: 'Teclat',
      paste: 'Enganxa',
      tips: 'Només es permeten lletres i símbols estàndard',
      placeholder: 'Escriu aquí',
      virtual: 'Teclat',
      readClipboard: 'Llegir des del porta-retalls',
      clipboardPermissionDenied:
        "S'ha denegat el permís del porta-retalls. Permet l'accés al porta-retalls al teu navegador.",
      clipboardReadError: "No s'ha pogut llegir el porta-retalls",
      dropdownEnglish: 'Anglès',
      shortcut: {
        title: 'Dreceres',
        custom: 'Personalitzat',
        save: 'Desa'
      },
      leaderKey: {
        title: 'Tecla líder',
        howToUse: "Com s'utilitza",
        simultaneous: {
          desc2: 'Intuïtiu, però pot entrar en conflicte amb les dreceres del sistema.'
        },
        sequential: {
          title: 'Mode seqüencial',
          desc2: 'Requereix més passos, però evita completament els conflictes del sistema.'
        },
        enable: 'Activa la tecla líder',
        tip: "Quan s'assigna com a tecla líder, aquesta tecla només funciona com a activador de dreceres i perd el seu comportament predeterminat.",
        shiftRight: 'Maj dreta',
        ctrlRight: 'Ctrl dret',
        metaRight: 'Win dret',
        recorder: {
          rec: 'REC',
          activate: 'Activa les tecles'
        }
      }
    },
    mouse: {
      title: 'Ratolí',
      cursor: 'Estil del cursor',
      default: 'Cursor per defecte',
      cell: 'Cursor de cel·la',
      text: 'Cursor de text',
      grab: 'Cursor de mà',
      hide: 'Amaga el cursor',
      mode: 'Mode de ratolí',
      absolute: 'Mode absolut',
      relative: 'Mode relatiu',
      direction: 'Direcció de la roda de desplaçament',
      scrollUp: "Desplaça't cap amunt",
      scrollDown: "Desplaça't cap avall",
      speed: 'Velocitat de desplaçament',
      fast: 'Ràpida',
      slow: 'Lenta',
      requestPointer: "Estàs usant el mode relatiu. Fes clic a l'escriptori per obtenir el punter.",
      resetHid: 'Restablir HID',
      hidOnly: {
        title: 'Mode només HID',
        tip1: 'Activar el mode només HID desmuntarà el disc virtual i la xarxa virtual',
        tip2: 'En mode només HID, no es pot muntar imatges',
        tip3: 'El NanoKVM es reiniciarà automàticament en canviar de mode',
        enable: 'Activa mode només HID',
        disable: 'Desactiva mode només HID'
      }
    },
    image: {
      title: 'Imatges',
      loading: 'Carregant...',
      empty: "No s'ha trobat res",
      mountMode: 'Mode de muntatge',
      mountFailed: 'Error en muntar',
      unmountFailed: "No s'ha pogut desmuntar",
      forceEject: "Força l'expulsió",
      tips: {
        title: 'Com pujar imatges',
        usb1: 'Connecta el NanoKVM al teu ordinador via USB.',
        usb3: "Obre el disc virtual i copia la imatge a l'arrel.",
        scp1: 'Comprova que el NanoKVM i el teu ordinador estan a la mateixa xarxa.',
        scp2: 'Obre un terminal i usa SCP per pujar la imatge al directori /data del NanoKVM.',
        scp3: 'Exemple: scp ruta-de-la-imatge root@ip-del-nanokvm:/data',
        tfCard: 'Targeta TF',
        tf1: 'Mètode disponible a sistemes GNU/Linux',
        tf3: "Introdueix la targeta en un lector i connecta'l a l'ordinador.",
        tf4: 'Copia la imatge al directori /data de la targeta.',
        tf5: 'Reintrodueix la targeta al NanoKVM.'
      }
    },
    script: {
      title: 'Scripts',
      upload: 'Puja',
      run: 'Executa',
      runBackground: 'Executa en segon pla',
      runFailed: "Error en l'execució",
      delDesc: 'Estàs segur que vols eliminar aquest fitxer?',
      delete: 'Esborra',
      close: 'Tanca'
    },
    terminal: {
      title: 'Terminal',
      nanokvm: 'Terminal NanoKVM',
      serial: 'Terminal de port sèrie',
      serialPort: 'Port sèrie',
      serialPortPlaceholder: 'Introdueix el port sèrie',
      parity: 'Paritat',
      parityNone: 'Cap',
      parityEven: 'Parell',
      parityOdd: 'Senar',
      flowControl: 'Control de flux',
      flowControlNone: 'Cap',
      flowControlSoft: 'Programari',
      flowControlHard: 'Maquinari',
      dataBits: 'Bits de dades',
      stopBits: 'Bits de parada'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'Enviant comanda...',
      sent: 'Comanda enviada',
      input: 'Introdueix la MAC',
      ok: "D'acord"
    },
    download: {
      title: "Descarregador d'imatges",
      input: 'Introdueix la URL de la imatge',
      ok: "D'acord",
      diskOff: 'Apaga el disc virtual',
      NoISO: 'Cap ISO',
      invalidSHA256: 'SHA-256 ha de ser una cadena hexadecimal de 64 caràcters',
      checksumFailed: 'Descàrrega fallida: ha fallat la verificació SHA-256'
    },
    power: {
      title: 'Alimentació',
      showConfirm: 'Confirmació',
      showConfirmTip: "Les operacions d'alimentació requereixen confirmació",
      reset: 'Reinicia',
      resetConfirm: 'Vols realment reiniciar?',
      powerConfirm: 'Vols realment encendre/apagar?',
      okBtn: 'Sí',
      cancelBtn: 'No'
    },
    settings: {
      title: 'Configuració',
      about: {
        title: 'Sobre NanoKVM',
        information: 'Informació',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Versió aplicació',
        applicationTip: 'Versió de la interfície web de NanoKVM',
        community: 'Comunitat',
        hostname: 'Nom del dispositiu',
        hostnameUpdated: 'Nom actualitzat. Reinicia per aplicar.',
        ipType: {}
      },
      appearance: {
        title: 'Aparença',
        display: 'Pantalla',
        language: 'Idioma',
        webTitle: 'Títol web',
        webTitleDesc: 'Personalitza el títol de la pàgina',
        menuBar: {
          title: 'Barra de menús',
          mode: 'Mode de visualització',
          modeDesc: 'Mostra la barra de menús a la pantalla',
          modeOff: 'Apagat',
          modeAuto: 'Ocultació automàtica',
          modeAlways: 'Sempre visible',
          keyboardLedStatus: 'Indicadors de bloqueig del teclat',
          keyboardLedStatusDesc:
            'Mostra l’estat de Bloq Num, Bloq Maj i Bloq Despl de l’ordinador remot',
          icons: 'Icones del submenú',
          iconsDesc: 'Mostra les icones del submenú a la barra de menús'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Estat de bloqueig del teclat remot',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Bloq Num',
        numLockShort: 'Num',
        capsLock: 'Bloq Maj',
        capsLockShort: 'Maj',
        scrollLock: 'Bloq Despl',
        scrollLockShort: 'Despl',
        on: 'Activat',
        off: 'Desactivat',
        unknown: 'Desconegut'
      },
      device: {
        title: 'Dispositiu',
        oled: {
          title: 'OLED',
          description: 'Apagar pantalla OLED després de'
        },
        ssh: {
          description: 'Activa accés remot per SSH'
        },
        swap: {
          title: 'Swap',
          description: 'Defineix la mida del fitxer swap'
        },
        mouseJiggler: {
          title: 'Mou-ratolí automàtic',
          description: 'Evita que el dispositiu remot entri en repòs',
          disable: 'Desactiva',
          absolute: 'Mode absolut',
          relative: 'Mode relatiu'
        },
        mdns: {
          description: 'Activa descobriment mDNS'
        },
        hdmi: {
          description: 'Activa la sortida HDMI',
          idleTimeoutTitle: "Temps d'espera d'inactivitat de captura",
          idleTimeoutDescription:
            'Atura la captura HDMI després de no detectar espectadors actius durant'
        },
        hidOnly: 'Mode només HID',
        disk: 'Disc virtual',
        network: 'Xarxa virtual',
        networkDesc: 'Munta una targeta de xarxa virtual al dispositiu remot',
        reboot: 'Reinicia',
        rebootDesc: 'Segur que vols reiniciar el NanoKVM?'
      },
      network: {
        title: 'Xarxa',
        wifi: {
          title: 'Wi-Fi',
          description: 'Configura la xarxa Wi-Fi',
          apMode: "El mode AP està activat; connecta't al Wi-Fi escanejant el codi QR",
          connect: "Connecta't a Wi-Fi",
          connectDesc1: 'Introdueix el SSID i la contrasenya de la xarxa',
          disconnect: 'Segur que vols desconnectar la xarxa?',
          ssid: 'Nom',
          password: 'Contrasenya',
          joinBtn: 'Connecta',
          cancelBtn: 'Cancel·la'
        },
        tls: {
          description: 'Activa el protocol HTTPS'
        },
        dns: {
          title: 'DNS',
          description: 'Configura els servidors DNS per a NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: "Configura l'adreçament IPv4 per a la interfície cablejada",
          dhcp: 'DHCP',
          manual: 'Manual',
          apply: 'Aplica',
          saved: 'Configuració DNS desada',
          redirecting: 'Configuració de xarxa desada. Obrint la nova adreça...',
          saveFailed: "No s'ha pogut desar la configuració DNS",
          unsaved: 'Canvis no desats',
          maxServers: 'Es permeten com a màxim {{count}} servidors DNS',
          dhcpServersDescription: "Els servidors DNS s'obtenen automàticament via DHCP",
          interface: 'Interfície',
          ipAddress: 'Adreça IP',
          subnetMask: 'Màscara de subxarxa',
          router: 'Encaminador'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Optimització de memòria',
          tip: 'Quan es supera el límit de memòria, es fa una neteja més agressiva. Recomanat: 75MB si uses Tailscale. Requereix reiniciar Tailscale.'
        },
        swap: {
          title: 'Intercanvi de memòria'
        },
        restart: 'Reiniciar Tailscale?',
        stop: 'Aturar Tailscale?',
        loading: 'Carregant...',
        install: 'Instal·la',
        installing: 'Instal·lant',
        failed: 'Error en la instal·lació',
        download: 'Descarrega el',
        package: "paquet d'instal·lació",
        unzip: 'i descomprimeix-lo',
        upTailscale: 'Puja tailscale al directori /usr/bin/ del NanoKVM',
        upTailscaled: 'Puja tailscaled al directori /usr/sbin/ del NanoKVM',
        refresh: 'Actualitza la pàgina',
        run: 'Comença',
        notLogin: 'El dispositiu no està vinculat. Inicia sessió per vincular-lo.',
        urlPeriod: 'Aquesta URL és vàlida durant 10 minuts',
        login: 'Inicia sessió',
        loginSuccess: 'Sessió iniciada correctament',
        deviceName: 'Nom del dispositiu',
        deviceIP: 'IP del dispositiu',
        account: 'Compte',
        logout: 'Tanca sessió',
        logoutDesc: 'Segur que vols tancar sessió?',
        uninstall: 'Desinstal·la Tailscale',
        okBtn: 'Sí',
        cancelBtn: 'No'
      },
      update: {
        title: 'Comprova actualitzacions',
        queryFailed: 'Error en obtenir la versió',
        updateFailed: 'Error en actualitzar. Torna-ho a intentar.',
        isLatest: 'Ja tens la darrera versió.',
        available: 'Hi ha una actualització disponible. Vols actualitzar ara?',
        confirm: 'Confirma',
        cancel: 'Cancel·la',
        preview: 'Versió de prova',
        offline: {
          title: 'Actualitzacions fora de línia',
          desc: "Actualització mitjançant el paquet d'instal·lació local",
          upload: 'Puja',
          updateFailed: 'Error en actualitzar. Torna-ho a intentar.'
        }
      },
      account: {
        title: 'Compte',
        webAccount: 'Nom del compte web',
        password: 'Contrasenya',
        updateBtn: 'Canvia',
        logoutBtn: 'Tanca sessió',
        logoutDesc: 'Segur que vols tancar sessió?',
        okBtn: 'Sí',
        cancelBtn: 'No'
      }
    },
    picoclaw: {
      title: 'PicoClaw Assistent',
      inputPlaceholder: 'Descriu què vols que faci el PicoClaw',
      newConversation: 'Nova conversa',
      processing: "S'està processant...",
      agent: {
        defaultTitle: 'Assistent general',
        kvmTitle: 'Control remot',
        switched: "Rol d'agent canviat",
        switchFailed: "No s'ha pogut canviar la funció d'agent"
      },
      send: 'Envia',
      cancel: 'Cancel·la',
      status: {
        connecting: "S'està connectant a la passarel·la...",
        connected: 'Sessió de PicoClaw connectada',
        disconnected: 'Sessió de PicoClaw tancada',
        stopped: "S'ha enviat la sol·licitud d'aturada",
        runtimeStarted: "Temps d'execució de PicoClaw iniciat",
        runtimeStartFailed: "No s'ha pogut iniciar el temps d'execució de PicoClaw",
        runtimeStopped: "Temps d'execució de PicoClaw aturat",
        runtimeStopFailed: "No s'ha pogut aturar el temps d'execució de PicoClaw"
      },
      connection: {
        runtime: {
          checking: 'Comprovació',
          ready: "Temps d'execució a punt",
          stopped: "El temps d'execució s'ha aturat",
          unavailable: "Temps d'execució no disponible",
          configError: 'Error de configuració'
        },
        transport: {
          connecting: 'En connexió',
          connected: 'Connectat'
        },
        run: {
          idle: 'Inactiu',
          busy: 'Ocupat'
        }
      },
      message: {
        toolAction: 'Acció',
        observation: 'Observació',
        screenshot: 'Captura de pantalla'
      },
      overlay: {
        locked: "PicoClaw està controlant el dispositiu. L'entrada manual està en pausa."
      },
      install: {
        install: 'Instal·la PicoClaw',
        installing: 'Instal·lant PicoClaw',
        success: 'PicoClaw instal·lat correctament',
        failed: "No s'ha pogut instal·lar PicoClaw",
        uninstalling: "S'està desinstal·lant el temps d'execució...",
        requiredTitle: 'PicoClaw no està instal·lat',
        requiredDescription: "Instal·leu PicoClaw abans d'iniciar el temps d'execució de PicoClaw.",
        progressDescription: "PicoClaw s'està baixant i instal·lant.",
        stages: {
          preparing: 'Preparant',
          downloading: "S'està baixant",
          extracting: 'Extracció',
          verifying: 'Verificant',
          installing: 'Instal·lant',
          installed: 'Instal·lat',
          install_timeout: 'Temps esgotat',
          install_failed: 'Ha fallat'
        }
      },
      model: {
        requiredTitle: 'La configuració del model és necessària',
        requiredDescription: "Configura el model PicoClaw abans d'utilitzar el xat PicoClaw.",
        docsTitle: 'Guia de configuració',
        docsDesc: 'Models i protocols compatibles',
        menuLabel: 'Configura el model',
        modelIdentifier: 'Identificador del model',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'Clau API',
        save: 'Desa',
        saved: "S'ha desat la configuració del model",
        saveFailed: "No s'ha pogut desar la configuració del model",
        invalid: "Cal indicar l'identificador del model, l'API Base URL i la clau API"
      },
      uninstall: {
        menuLabel: 'Desinstal·la',
        confirmTitle: 'Desinstal·la PicoClaw',
        confirmOk: 'Desinstal·la'
      },
      history: {
        title: 'Historial',
        loading: 'Carregant sessions...',
        emptyTitle: 'Encara no hi ha historial',
        emptyDescription: 'Les sessions anteriors de PicoClaw apareixeran aquí.',
        loadFailed: "No s'ha pogut carregar l'historial de sessions",
        deleteFailed: "No s'ha pogut suprimir la sessió",
        deleteConfirmTitle: 'Suprimeix la sessió',
        deleteConfirmOk: 'Esborra',
        messageCount_one: '{{count}} missatge',
        messageCount_other: '{{count}} missatges'
      },
      config: {
        stopRuntime: 'Atura PicoClaw'
      },
      start: {}
    },
    error: {
      title: 'Hi ha hagut un error',
      refresh: 'Actualitza'
    },
    fullscreen: {
      toggle: 'Pantalla completa'
    },
    menu: {
      collapse: 'Amaga menú'
    }
  }
};

export default ca;
