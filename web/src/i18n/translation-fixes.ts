type TranslationMap = Record<string, string>;

// Corrections from the translation review: wrong or stale strings, typos, English that was never translated,
// and keys that had no translation. Applied after every other layer, so it wins over the older extras.
export const translationFixes: Record<string, TranslationMap> = {
  ca: {
    'auth.illegalPassword':
      'La contrasenya ha de tenir almenys 8 caràcters i no pot contenir cometes ni barres',
    'screen.videoDirectTips':
      'Activa HTTPS a "Configuració > Sistema > Xarxa" per utilitzar aquest mode',
    'download.disabled':
      "Ara no es poden descarregar ni pujar imatges perquè l'emmagatzematge no és escrivible. Si hi ha una imatge muntada, desmunta-la i després apaga el disc virtual perquè l'emmagatzematge torni a ser escrivible.",
    'keyboard.leaderKey.simultaneous.title': 'Mode simultani',
    'keyboard.shortcut.clear': 'Esborra',
    'picoclaw.config.startRuntime': 'Inicia PicoClaw',
    'picoclaw.start.title': 'Inicia PicoClaw',
    'picoclaw.model.saving': "S'està desant",
    'keyboard.dropdownGerman': 'Alemany',
    'keyboard.dropdownFrench': 'Francès',
    'keyboard.dropdownRussian': 'Rus',
    'settings.device.diskDesc': 'Munta la targeta SD al dispositiu remot',
    'settings.device.diskCancelMount':
      'Activar el disc virtual cancel·la la imatge muntada. Vols continuar?',
    'screen.transferRunningTitle': "Transferència d'imatge en curs",
    'screen.transferRunningDesc':
      "En canviar el mode de vídeo es recarrega la pàgina, cosa que cancel·la la pujada o descàrrega d'imatge en curs.",
    'screen.transferRunningOk': 'Canvia el mode',
    'settings.device.diskTransferRunning':
      "Hi ha una transferència d'imatge en curs. Espera que acabi abans d'activar el disc virtual.",
    'settings.update.previewChannels':
      "Controla tant el canal de vista prèvia de l'aplicació com el del sistema",
    'settings.update.system.appUpdateRequired':
      "Actualitza l'aplicació a {{version}} abans d'instal·lar aquesta actualització del sistema",
    'settings.update.system.requiredAppVersion': "Versió d'aplicació necessària",
    'settings.system.firewall.enableHttpsFirst':
      "Activa HTTPS abans d'activar el mode de tallafoc Restringit o Paranoic",
    'settings.system.firewall.httpsRequired':
      "Els modes Restringit i Paranoic estan desactivats fins que s'activi HTTPS a Configuració > Sistema > Xarxa",
    'settings.system.firewall.mode.baselineDesc':
      "Perfil obert de compatibilitat. El tallafoc funciona, però els orígens entrants no estan restringits. Utilitza'l només en xarxes de confiança.",
    'settings.system.firewall.mode.moderateDesc':
      "Perfil per defecte. Manté els serveis de Base, però només accepta noves connexions entrants d'intervals privats, d'enllaç local o de loopback. El trànsit de sortida continua obert.",
    'settings.system.firewall.mode.paranoidDesc':
      "Accés HTTPS només local. Bloqueja SSH, HTTP, les actualitzacions en línia i altres funcions de xarxa de sortida. La pujada d'actualitzacions fora de línia i les instal·lacions ja preparades continuen disponibles.",
    'settings.system.firewall.mode.current': 'Actual',
    'settings.system.firewall.mode.default': 'Per defecte',
    'settings.system.firewall.mode.localOnly': 'Només local',
    'settings.system.firewall.mode.openTag': 'Entrada oberta',
    'settings.system.firewall.mode.httpsRequiredTag': 'Cal HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Sortida oberta',
    'settings.system.firewall.mode.outboundLimited': 'Sortida limitada',
    'settings.system.firewall.mode.httpsOnly': 'Només HTTPS',
    'settings.system.firewall.moderate.apply': 'Canvia a Moderat',
    'settings.system.firewall.baseline.apply': 'Canvia a Base',
    'settings.system.firewall.baseline.confirmTitle': 'Canviar al mode Base obert?',
    'settings.system.firewall.baseline.confirmDesc':
      "El servei de tallafoc continua actiu, però se suprimeix la restricció d'intervals d'origen només locals. Els intervals d'origen públics poden arribar als serveis exposats de NanoKVM si la xarxa els encamina.",
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC està desactivat en els modes de tallafoc Restringit i Paranoic',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Moderat',
    'settings.system.firewall.mode.restricted': 'Restringit',
    'settings.system.firewall.mode.paranoid': 'Paranoic',
    'settings.system.firewall.restricted.enable': 'Activa Restringit',
    'settings.system.firewall.restricted.confirmTitle': 'Vols activar el mode Restringit?',
    'settings.system.firewall.paranoid.enable': 'Activa Paranoic',
    'settings.system.firewall.paranoid.confirmTitle': 'Vols activar el mode Paranoic?',
    'settings.update.paranoidBlocked':
      'Les actualitzacions en línia estan bloquejades pel mode de tallafoc Paranoic',
    'settings.device.hidOnlyDesc':
      "Millora la compatibilitat amb l'amfitrió si el ratolí o el teclat deixen de respondre",
    'mouse.hidOnly.desc':
      "Si el ratolí o el teclat deixen de respondre i restablir el HID no ajuda, pot ser un problema de compatibilitat entre el NanoKVM i l'amfitrió.",
    'settings.device.hidOnlyTip':
      "El mode HID-Only deixa d'emular dispositius virtuals i només conserva el control bàsic HID",
    'settings.device.ssh.tip':
      "Configura una contrasenya segura a Compte > Contrasenya abans d'activar aquesta opció",
    'keyboard.shortcut.captureTips':
      'Capturar tecles del sistema, com la tecla Windows, requereix permís de pantalla completa',
    'settings.device.diskLocked':
      'Desactivat mentre hi ha una imatge muntada, i activar-lo cancel·la el muntatge',
    'image.tips.usb2':
      "Assegura't que el disc virtual està muntat a Configuració > Dispositiu > Disc virtual.",
    'image.tips.tf2':
      'Extreu la targeta TF del NanoKVM. A la versió FULL, obre primer la carcassa.',
    'auth.tips.change3': "Contrasenya root del sistema per a l'inici de sessió SSH",
    'download.sha256': 'Suma de verificació SHA-256 opcional',
    'power.powerShort': "Botó d'engegada: clic curt",
    'power.powerLong': "Botó d'engegada: clic llarg",
    'settings.tailscale.notInstall': 'Tailscale no instal·lat. Instal·la-ho.',
    'settings.tailscale.retry': 'Actualitza la pàgina i torna-ho a provar, o instal·la manualment.',
    'wifi.success': "Comprova l'estat de la xarxa del NanoKVM i visita la nova adreça IP",
    'wifi.failed': "L'operació ha fallat, torna-ho a intentar",
    'screen.webrtcConnectionFailed.description':
      'Comprova la connexió de xarxa o canvia el mode de vídeo',
    'keyboard.shortcut.enterFullScreen': 'Canvia el mode de pantalla completa',
    'keyboard.leaderKey.desc':
      "Evita les restriccions del navegador i envia dreceres del sistema directament a l'amfitrió remot",
    'image.mountDesc': 'En alguns sistemes cal expulsar el disc virtual abans de muntar la imatge',
    'image.unmountDesc':
      "En alguns sistemes, cal expulsar manualment de l'amfitrió remot abans de desmuntar la imatge",
    'auth.totp.prompt': "Introdueix el codi de 6 dígits de l'aplicació d'autenticació",
    'auth.totp.backupPrompt': 'Introdueix un dels teus codis de còpia de seguretat',
    'auth.setupRecovery':
      'Si es perd aquesta contrasenya, la recuperació requereix tornar a gravar la targeta SD',
    'download.diskShared':
      "Apaga primer el disc virtual i després fes servir la descàrrega d'imatges",
    'download.remoteDisabled':
      'La descàrrega remota d’ISO està desactivada a Configuració > Aparença',
    'settings.device.usbWakeupDesc':
      'Permet que els esdeveniments de teclat o ratolí despertin el host remot',
    'settings.device.usbWakeupTip':
      'Desactiva-ho si el host registra missatges USB wakeup repetits',
    'settings.network.tls.tip':
      'Atenció: Usar HTTPS pot augmentar la latència, sobretot amb vídeo MJPEG',
    'settings.system.time.servers.description':
      'Fes servir els servidors públics per defecte, el teu encaminador local o servidors NTP personalitzats',
    'settings.systemLog.remote.protocol': 'El syslog UDP és usat pel syslogd BusyBox actual',
    'settings.systemLog.viewer.truncated': 'Només es mostren les dades de registre més recents',
    'settings.update.system.rawEnableDesc':
      'Permet escriure imatges raw verificades de boot/rootfs a la targeta SD des d’aquesta pantalla',
    'settings.account.totp.description':
      "Exigeix un codi temporal d'una aplicació d'autenticació, a més de la contrasenya",
    'settings.account.totp.requireDescription':
      "Mentre estigui activada, no es pot desactivar l'autenticació de dos factors, i un compte que no la tingui l'haurà de configurar abans d'utilitzar el dispositiu",
    'picoclaw.empty': 'Obre el tauler i inicia una tasca per començar',
    'picoclaw.agent.defaultDescription': 'Ajuda general de xat, cerca i espai de treball',
    'picoclaw.agent.kvmDescription': "Opera l'amfitrió remot mitjançant NanoKVM",
    'picoclaw.install.uninstalled': "El temps d'execució s'ha desinstal·lat correctament",
    'picoclaw.install.uninstallFailed': 'La desinstal·lació ha fallat',
    'settings.device.swap.tip': 'Pot reduir la vida útil de la targeta SD',
    'settings.update.previewTip':
      'Compte: aquestes versions poden tenir errors o funcions inacabades',
    'auth.changePasswordDesc': 'Per a la seguretat del dispositiu, canvia la contrasenya',
    'settings.network.dns.manualServersDescription': "S'admeten servidors IPv4 i IPv6",
    'terminal.baudrate': 'Velocitat en bauds',
    'settings.tailscale.stopDesc': "Tanca la sessió i desactiva l'inici automàtic.",
    'terminal.unlockDesc':
      'Introdueix la contrasenya del compte web per iniciar una sessió de terminal',
    'terminal.locked': 'Massa intents, torna-ho a provar més tard',
    'settings.update.updating': 'Actualització iniciada. Espera...',
    'keyboard.dropdownKorean': 'Coreà',
    'keyboard.dropdownJapanese': 'Japonès',
    'auth.globalLocked': 'Sistema sota protecció, torna-ho a provar més tard',
    'auth.setupDescription':
      'Aquest dispositiu encara no té cap compte web. Crea el primer compte administrador per continuar.',
    'auth.tips.hardenedRecovery':
      'Aquesta imatge Hardened no admet restablir la contrasenya amb el botó BOOT. Si es perd la contrasenya, torna a gravar la targeta SD i crea un compte nou.',
    'auth.totp.invalidCode': 'Aquest codi no és vàlid. Torna-ho a provar.',
    'wifi.invalidMode':
      'El mode actual no admet la configuració de xarxa. Ves al teu dispositiu i activa el mode de configuració Wi-Fi.',
    'keyboard.shortcut.capture': 'Fes clic aquí per capturar la drecera',
    'keyboard.leaderKey.simultaneous.desc1': 'Mantén premuda la tecla líder i prem la drecera.',
    'keyboard.leaderKey.sequential.desc1':
      'Prem la tecla líder → prem la drecera en seqüència → torna a prémer la tecla líder.',
    'keyboard.leaderKey.placeholder': 'Prem la tecla líder',
    'keyboard.leaderKey.recorder.input': 'Prem la drecera...',
    'mouse.sensitivityDesc':
      'Fes-ho servir per al mode relatiu d’escriptori. Valors més baixos redueixen la deriva causada per l’acceleració del ratolí del host.',
    'mouse.mobile.touchSyncDesc':
      'Mou-te per qualsevol punt de l’àrea KVM. El cursor remot conserva la posició entre tocs i es manté sincronitzat amb HID absolut.',
    'mouse.mobile.trackpadDesc':
      'Mou un dit per desplaçar el punter remot. Toca per fer clic; pressió llarga o toc amb dos dits per al clic dret.',
    'mouse.mobile.directDesc':
      'Toca directament la posició de la pantalla remota. Arrossega per mantenir premut el botó esquerre.',
    'image.diskOnWarn':
      "Muntar la imatge desactiva el disc virtual, de manera que l'ordinador ja no pot accedir a /data. Vols continuar?",
    'image.diskOffWarn':
      "El disc virtual està desactivat i cal activar-lo per muntar la imatge. Els dispositius USB de l'ordinador es tornaran a enumerar. Vols continuar?",
    'image.forceEjectConfirm':
      "L'amfitrió ha bloquejat la unitat òptica. Forçar l'expulsió desconnecta el dispositiu USB virtual durant un moment, de manera que el teclat i el ratolí poden desconnectar-se breument. Vols continuar?",
    'image.usbReconnectConfirm':
      'Reconnecta el gadget USB només si el host remot no ha detectat el canvi de mitjà. El teclat i el ratolí es poden desconnectar breument.',
    'image.deleteConfirm': 'Estàs segur que vols suprimir aquesta imatge?',
    'terminal.sessionClosed': 'Sessió de terminal tancada. Desbloqueja de nou per reconnectar.',
    'terminal.sessionError':
      'La connexió del terminal ha fallat. Desbloqueja de nou per reintentar.',
    'download.mountedImage':
      'Aquesta imatge està muntada. Desmunta-la abans de pujar un fitxer amb el mateix nom.',
    'download.uploadbox': 'Deixa anar el fitxer aquí o fes clic per seleccionar-lo',
    'download.stalled': 'La transferència s’ha aturat. Comprova la connexió i torna-ho a provar.',
    'settings.appearance.languageDesc': "Selecciona l'idioma per a la interfície",
    'settings.appearance.menuBar.terminalWarningTitle': 'Vols activar el terminal web?',
    'settings.appearance.menuBar.terminalWarningDesc':
      "El terminal obre una shell root al navegador. Activa'l només en una xarxa de confiança i desactiva'l en acabar.",
    'settings.appearance.menuBar.remoteDownloadWarningTitle':
      'Vols activar la descàrrega remota d’ISO?',
    'settings.appearance.menuBar.remoteDownloadWarningDesc':
      "NanoKVM baixarà una ISO des d’un URL i l’escriurà a /data. Activa'l només per a URL de confiança i desactiva'l en acabar.",
    'settings.device.mdns.tip':
      "Permet accedir a aquest dispositiu pel seu nom .local. No cal si et connectes per adreça IP o si el teu DNS ja resol el nom d'amfitrió.",
    'settings.tailscale.swap.tip':
      "Si els problemes persisteixen després d'activar l'optimització de memòria, prova d'habilitar la memòria d'intercanvi. Això estableix la mida del fitxer d'intercanvi a 256MB per defecte, que es pot ajustar a \"Configuració > Dispositiu\".",
    'settings.tailscale.notRunning':
      "Tailscale no s'està executant. Si us plau, inicia'l per continuar.",
    'settings.tailscale.uninstallDesc': 'Estàs segur que vols desinstal·lar Tailscale?',
    'settings.update.system.rawEnableConfirmDesc':
      'Les actualitzacions raw poden substituir les particions boot i rootfs. Fes-ho servir només si tens accés físic de recuperació.',
    'settings.update.system.rawInstallDisabled':
      'Aquesta actualització preparada escriu particions raw de la targeta SD. Activa les actualitzacions raw del sistema abans d’instal·lar-la.',
    'settings.update.system.rawInstallConfirmDesc':
      'Aquest paquet verificat escriurà imatges raw boot/rootfs a les particions de la targeta SD i reiniciarà automàticament. L’escriptura pot trigar uns minuts; mantén l’alimentació connectada.',
    'settings.update.system.rawInstallWarning':
      'No hi ha rollback automàtic per a actualitzacions de particions raw. Si l’arrencada falla, recupera la targeta SD manualment.',
    'settings.update.offline.invalidName':
      "Format de nom de fitxer no vàlid. Baixa'l des de les versions de GitHub.",
    'settings.account.totp.enableDescription':
      'Confirma la contrasenya per continuar. Cal per a qualsevol canvi del segon factor.',
    'settings.account.totp.disableTitle': "Vols desactivar l'autenticació de dos factors?",
    'settings.account.totp.disableDescription':
      'El teu compte només quedarà protegit per la contrasenya. Confirma amb la contrasenya per continuar.',
    'settings.account.totp.invalidCode': 'Aquest codi no coincideix. Prova el següent.',
    'settings.account.totp.scan': "Escaneja-ho amb l'aplicació d'autenticació.",
    'settings.account.totp.backupTitle': 'Desa ara els codis de còpia de seguretat',
    'settings.account.totp.clockUnsynced':
      "El rellotge del dispositiu encara no està sincronitzat. Sincronitza l'hora a Configuració > Sistema > Hora abans de configurar-ho.",
    'settings.account.totp.noBackupCodes':
      'No queda cap codi de còpia de seguretat. Fes clic a Genera per crear-ne un joc nou.',
    'settings.account.totp.regenerateTitle': 'Vols generar codis de còpia de seguretat nous?',
    'settings.account.totp.regenerateDescription':
      'Els codis de còpia de seguretat actuals deixaran de funcionar. Confirma amb la contrasenya per continuar.',
    'settings.account.totp.copyFailed':
      "No s'ha pogut copiar. Selecciona els codis i copia'ls manualment.",
    'settings.account.totp.requiredDescription':
      "Aquest dispositiu està configurat per exigir un segon factor, però el teu compte encara no en té cap. Configura'l ara per continuar.",
    'picoclaw.uninstall.confirmContent':
      "Estàs segur que vols desinstal·lar PicoClaw? Això suprimirà l'executable i tots els fitxers de configuració.",
    'picoclaw.history.deleteConfirmContent': 'Estàs segur que vols suprimir "{{title}}"?',
    'picoclaw.start.description':
      "Inicia el temps d'execució per començar a utilitzar l'assistent PicoClaw.",
    'auth.totp.noEmptyCode': 'Introdueix un codi',
    'wifi.ap.authDescription': 'Introdueix la contrasenya AP per continuar',
    'download.inputfile': "Introdueix el fitxer d'imatge",
    'download.sha256Placeholder': 'Introdueix una suma de verificació SHA-256 de 64 caràcters',
    'settings.network.dns.invalid': 'Introdueix una adreça IPv4 o IPv6 vàlida',
    'settings.network.dns.invalidNetwork':
      'Introdueix una adreça IPv4, una màscara de subxarxa i un encaminador vàlids',
    'settings.account.totp.codePlaceholder': 'Introdueix el codi de 6 dígits per confirmar',
    'picoclaw.model.apiKeyPlaceholder': 'Introdueix la clau API del model',
    'keyboard.localInput': 'Entrada del teclat mòbil',
    'settings.network.configuration': 'Configuració',
    'settings.network.dns.servers': 'Servidors',
    'settings.system.firewall.mode.restrictedDesc':
      'HTTPS i SSH només locals, més DNS, NTP, syslog i actualitzacions en línia de sortida. DHCP i el trànsit IPv6 essencial continuen disponibles. WebRTC està bloquejat.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      "L'accés administratiu entrant quedarà limitat als rangs private IPv4, IPv4 link-local/loopback, IPv6 link-local o IPv6 loopback per a HTTPS i SSH. Els rangs públics no estan permesos. DNS, NTP, syslog remot, actualitzacions online, DHCP, connexions establertes i trànsit essencial IPv6 de sortida romandran disponibles. WebRTC/ICE UDP i la resta de trànsit entrant/sortint quedaran bloquejats.",
    'settings.system.firewall.paranoid.confirmDesc':
      'Només quedarà disponible l’accés HTTPS des de rangs private IPv4, IPv4 link-local/loopback, IPv6 link-local o IPv6 loopback. SSH, HTTP, mDNS, NTP, descàrregues de GitHub i la resta de trànsit quedaran bloquejats excepte el mínim DHCP/control IPv6.',
    'settings.system.sections.systemLog': 'Registre',
    'settings.systemLog.remote.title': 'Registre remot',
    'settings.systemLog.remote.forward': 'Reenvia el registre del sistema',
    'settings.systemLog.remote.description':
      'Reenvia els missatges del sistema a un servidor remot',
    'settings.systemLog.kernel.title': 'Registre del kernel',
    'settings.systemLog.local.title': 'Memòria intermèdia del registre del sistema',
    'settings.systemLog.remote.hostDesc': "Nom d'amfitrió o adreça IPv4 del servidor syslog",
    'settings.systemLog.kernel.enabledDesc':
      'Captura els missatges del kernel al registre del sistema',
    'settings.systemLog.kernel.consoleLevelDesc':
      "Urgència mínima perquè un missatge del kernel s'imprimeixi a la consola",
    'settings.systemLog.local.priorityDesc': 'Urgència mínima perquè un missatge es registri',
    'settings.systemLog.local.bufferDesc':
      'Mida del registre a partir de la qual es fa la rotació del fitxer',
    'settings.systemLog.local.rotationsDesc':
      'Nombre de fitxers de registre rotats que es conserven',
    'settings.systemLog.local.compactDesc':
      "Ometeix el nom d'amfitrió i la facilitat de cada línia",
    'settings.systemLog.local.stripTimestampsDesc':
      "Elimina les marques de temps afegides per l'emissor; syslog afegeix les seves",
    'settings.systemLog.local.description':
      'Els registres actuals es mantenen a la RAM a {{path}} per evitar escriptures a la targeta SD',
    'settings.systemLog.kernel.enabled': 'Reenvia el registre del kernel',
    'settings.device.swap.size': 'Mida del swap',
    'settings.device.swap.description': "Utilitza un fitxer swap quan la memòria s'esgota",
    'settings.device.swap.sizeDescription': 'Defineix la mida del fitxer swap',
    'settings.device.sections.connectivity': 'Connectivitat',
    'settings.device.sections.hostConnection': "Connexió amb l'amfitrió",
    'settings.device.sections.inputOutput': 'Entrada i sortida',
    'settings.device.sections.optimizations': 'Optimitzacions',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': "Temps d'espera de l'OLED",
    'settings.device.oled.keepOn': "Mantén l'OLED encesa",
    'settings.device.oled.keepOnDescription': 'No apaguis mai la pantalla OLED',
    'settings.device.sessionLock.title': 'Bloqueja la sessió quan estigui inactiva'
  },
  cz: {
    'auth.illegalPassword': 'Heslo musí mít alespoň 8 znaků a nesmí obsahovat uvozovky ani lomítka',
    'screen.videoDirectTips':
      'Chcete-li používat tento režim, povolte HTTPS v "Nastavení > Systém > Síť"',
    'download.disabled':
      'Obrazy se teď nedají stáhnout ani nahrát, protože úložiště není zapisovatelné. Pokud je připojený obraz, odpojte ho a poté vypněte virtuální disk, aby bylo úložiště znovu zapisovatelné.',
    'keyboard.shortcut.clear': 'Vymazat',
    'keyboard.shortcut.capture': 'Kliknutím sem zachytíte zkratku',
    'power.powerConfirm': 'Provést operaci napájení?',
    'script.title': 'Skripty',
    'keyboard.dropdownEnglish': 'Anglicky',
    'keyboard.dropdownGerman': 'Německy',
    'keyboard.dropdownFrench': 'Francouzsky',
    'keyboard.dropdownRussian': 'Rusky',
    'settings.device.oled.description': 'Vypnout OLED displej po',
    'screen.transferRunningTitle': 'Probíhá přenos obrazu',
    'screen.transferRunningDesc':
      'Změna režimu videa znovu načte stránku, čímž se zruší probíhající nahrávání nebo stahování obrazu.',
    'screen.transferRunningOk': 'Změnit režim',
    'settings.device.diskTransferRunning':
      'Probíhá přenos obrazu. Před zapnutím virtuálního disku počkejte, až skončí.',
    'settings.update.previewChannels': 'Ovládá náhledové kanály aplikace i systému',
    'settings.update.system.appUpdateRequired':
      'Před instalací této aktualizace systému aktualizujte aplikaci na verzi {{version}}',
    'settings.update.system.requiredAppVersion': 'Požadovaná verze aplikace',
    'settings.device.diskDesc': 'Připojit SD kartu ke vzdálenému hostiteli',
    'settings.device.diskCancelMount':
      'Zapnutím virtuálního disku se zruší připojený obraz. Pokračovat?',
    'image.diskOnWarn':
      'Připojením obrazu se virtuální disk vypne, takže počítač už nebude mít přístup k /data. Pokračovat?',
    'image.diskOffWarn':
      'Virtuální disk je vypnutý a pro připojení obrazu je nutné ho zapnout. USB zařízení v počítači se znovu vyhledají. Pokračovat?',
    'download.diskShared': 'Nejprve vypněte virtuální disk a poté použijte stahování obrazu',
    'download.diskOff': 'Vypnout virtuální disk',
    'settings.device.diskLocked': 'Vypnuto, dokud je připojen obraz, a zapnutím se připojení zruší',
    'settings.tailscale.memory.tip':
      'Když využití paměti překročí limit, uvolňování paměti probíhá agresivněji, aby se paměť uvolnila. Aby se změna projevila, je nutné Tailscale restartovat.',
    'settings.tailscale.restart': 'Restartovat Tailscale?',
    'settings.tailscale.stop': 'Zastavit Tailscale?',
    'settings.tailscale.stopDesc': 'Odhlásit a vypnout automatické spuštění.',
    'settings.tailscale.okBtn': 'Ano',
    'settings.tailscale.cancelBtn': 'Ne',
    'wifi.success': 'Přejděte k zařízení a zkontrolujte stav sítě NanoKVM',
    'settings.system.firewall.enableHttpsFirst':
      'Před zapnutím režimu firewallu Omezený nebo Paranoidní zapněte HTTPS',
    'settings.system.firewall.httpsRequired':
      'Režimy Omezený a Paranoidní jsou vypnuté, dokud není HTTPS zapnuto v Nastavení > Systém > Síť',
    'settings.system.firewall.mode.baselineDesc':
      'Otevřený profil kompatibility. Firewall běží, ale příchozí zdroje nejsou omezeny. Používejte jej jen v důvěryhodných sítích.',
    'settings.system.firewall.mode.moderateDesc':
      'Výchozí profil. Zachovává služby profilu Základní, ale nová příchozí spojení přijímá jen ze soukromých, link-local nebo loopback rozsahů. Odchozí přístup zůstává otevřený.',
    'settings.system.firewall.mode.paranoidDesc':
      'Přístup HTTPS pouze z lokální sítě. Blokuje SSH, HTTP, online aktualizace a další odchozí síťové funkce. Offline nahrání aktualizací a již připravené instalace zůstávají dostupné.',
    'settings.system.firewall.mode.current': 'Aktuální',
    'settings.system.firewall.mode.default': 'Výchozí',
    'settings.system.firewall.mode.localOnly': 'Pouze lokálně',
    'settings.system.firewall.mode.openTag': 'Příchozí otevřené',
    'settings.system.firewall.mode.httpsRequiredTag': 'Vyžaduje HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Odchozí otevřené',
    'settings.system.firewall.mode.outboundLimited': 'Odchozí omezené',
    'settings.system.firewall.mode.httpsOnly': 'Pouze HTTPS',
    'settings.system.firewall.moderate.apply': 'Přepnout na Umírněný',
    'settings.system.firewall.baseline.apply': 'Přepnout na Základní',
    'settings.system.firewall.baseline.confirmTitle': 'Přepnout na otevřený režim Základní?',
    'settings.system.firewall.baseline.confirmDesc':
      'Služba firewallu zůstane aktivní, ale odstraní se omezení pouze na lokální zdrojové rozsahy. Veřejné zdrojové rozsahy se mohou dostat k vystaveným službám NanoKVM, pokud je síť směruje.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC je v režimech firewallu Omezený a Paranoidní vypnuto',
    'settings.system.firewall.mode.baseline': 'Základní',
    'settings.system.firewall.mode.moderate': 'Umírněný',
    'settings.system.firewall.mode.restricted': 'Omezený',
    'settings.system.firewall.mode.paranoid': 'Paranoidní',
    'settings.system.firewall.restricted.enable': 'Povolit Omezený',
    'settings.system.firewall.restricted.confirmTitle': 'Povolit režim Omezený?',
    'settings.system.firewall.paranoid.enable': 'Povolit Paranoidní',
    'settings.system.firewall.paranoid.confirmTitle': 'Povolit režim Paranoidní?',
    'settings.update.paranoidBlocked':
      'Online aktualizace jsou blokovány režimem firewallu Paranoidní',
    'settings.device.hidOnlyDesc':
      'Zlepšuje kompatibilitu s hostitelem, pokud myš nebo klávesnice přestanou reagovat',
    'mouse.hidOnly.desc':
      'Pokud myš nebo klávesnice přestanou reagovat a reset HID nepomůže, může jít o problém s kompatibilitou mezi NanoKVM a hostitelem.',
    'settings.device.hidOnlyTip':
      'Režim HID-Only přestane emulovat virtuální zařízení a ponechá pouze základní ovládání HID',
    'settings.device.ssh.tip': 'Před zapnutím této možnosti nastavte silné heslo v Účet > Heslo',
    'keyboard.shortcut.captureTips':
      'Zachycení systémových kláves, například klávesy Windows, vyžaduje oprávnění pro celou obrazovku',
    'image.tips.usb2':
      'Ujistěte se, že je virtuální disk připojen v Nastavení > Zařízení > Virtuální disk.',
    'image.tips.tf2': 'Vyjměte kartu TF z NanoKVM. U verze FULL nejprve rozeberte pouzdro.',
    'auth.tips.change3': 'Heslo systémového uživatele root pro přihlášení přes SSH',
    'download.sha256': 'Volitelný kontrolní součet SHA-256',
    'power.powerShort': 'Tlačítko napájení: krátký stisk',
    'power.powerLong': 'Tlačítko napájení: dlouhý stisk',
    'settings.tailscale.notInstall': 'Tailscale nebyl nalezen. Prosím nainstalujte jej.',
    'settings.tailscale.retry': 'Obnovte stránku a zkuste to znovu, nebo nainstalujte ručně.',
    'wifi.failed': 'Operace selhala, zkuste to znovu',
    'screen.webrtcConnectionFailed.description':
      'Zkontrolujte síťové připojení nebo přepněte režim videa',
    'keyboard.shortcut.enterFullScreen': 'Přepnout režim celé obrazovky',
    'keyboard.leaderKey.desc':
      'Obejít omezení prohlížeče a odeslat systémové zkratky přímo vzdálenému hostiteli',
    'image.mountDesc':
      'V některých systémech je nutné před připojením obrazu vysunout virtuální disk na vzdáleném hostiteli',
    'image.unmountDesc':
      'Na některých systémech se musíte před odpojením obrazu ručně vysunout ze vzdáleného hostitele',
    'auth.totp.prompt': 'Zadejte 6místný kód z ověřovací aplikace',
    'auth.totp.backupPrompt': 'Zadejte jeden ze svých záložních kódů',
    'auth.setupRecovery': 'Pokud toto heslo ztratíte, obnova vyžaduje přepsání SD karty',
    'download.remoteDisabled': 'Vzdálené stahování ISO je vypnuté v Nastavení > Vzhled',
    'settings.device.usbWakeupDesc': 'Povolí klávesnici nebo myši probudit vzdálený host',
    'settings.device.usbWakeupTip': 'Vypněte, pokud host zapisuje opakované zprávy USB wakeup',
    'settings.network.tls.tip':
      'Upozornění: Použití HTTPS může zvýšit latenci, zejména v režimu videa MJPEG',
    'settings.system.time.servers.description':
      'Použijte výchozí veřejné servery, místní router nebo vlastní servery NTP',
    'settings.systemLog.remote.protocol': 'Aktuální BusyBox syslogd používá UDP syslog',
    'settings.systemLog.viewer.truncated': 'Zobrazují se pouze nejnovější data protokolu',
    'settings.update.system.rawEnableDesc':
      'Povolí z této obrazovky zapisovat ověřené raw image boot/rootfs na SD kartu',
    'settings.account.totp.description':
      'Kromě hesla vyžadovat časově omezený kód z ověřovací aplikace',
    'settings.account.totp.requireDescription':
      'Je-li zapnuto, nelze dvoufázové ověření vypnout a účet, který ho nemá, si ho musí před použitím zařízení nastavit',
    'picoclaw.empty': 'Otevřete panel a spusťte úlohu',
    'picoclaw.agent.defaultDescription': 'Obecná nápověda pro chat, vyhledávání a pracovní prostor',
    'picoclaw.agent.kvmDescription': 'Ovládejte vzdáleného hostitele prostřednictvím NanoKVM',
    'picoclaw.install.uninstalled': 'Běhové prostředí bylo úspěšně odinstalováno',
    'picoclaw.install.uninstallFailed': 'Odinstalace se nezdařila',
    'settings.device.swap.tip': 'Povolení této funkce může zkrátit životnost vaší SD karty',
    'settings.update.previewTip':
      'Uvědomte si prosím, že předběžné verze mohou obsahovat chyby nebo neúplné funkce',
    'auth.changePasswordDesc':
      'Pro bezpečnost vašeho zařízení prosím změňte heslo pro přihlášení na webu',
    'settings.network.dns.manualServersDescription': 'Podporovány jsou servery IPv4 i IPv6',
    'settings.account.totp.savedThem': 'Mám je uložené',
    'terminal.unlockDesc': 'Pro spuštění terminálové relace zadejte heslo webového účtu',
    'terminal.locked': 'Příliš mnoho pokusů. Zkuste to později',
    'keyboard.dropdownKorean': 'Korejsky',
    'keyboard.dropdownJapanese': 'Japonsky',
    'keyboard.localInput': 'Vstup z klávesnice mobilu',
    'settings.network.configuration': 'Konfigurace',
    'settings.network.dns.servers': 'Servery',
    'settings.system.firewall.mode.restrictedDesc':
      'HTTPS a SSH jen z lokální sítě plus odchozí DNS, NTP, syslog a online aktualizace. DHCP a nezbytný provoz IPv6 zůstávají dostupné. WebRTC je blokováno.',
    'settings.system.firewall.backends': 'Backendy',
    'settings.system.firewall.restricted.confirmDesc':
      'Příchozí administrátorský přístup bude omezen na rozsahy private IPv4, IPv4 link-local/loopback, IPv6 link-local nebo IPv6 loopback pro HTTPS a SSH. Veřejné zdrojové rozsahy nejsou povoleny. Odchozí DNS, NTP, vzdálený syslog, online aktualizace, DHCP, navázaná spojení a nezbytný IPv6 řídicí provoz zůstanou dostupné. WebRTC/ICE UDP a ostatní příchozí/odchozí provoz budou blokovány.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Zůstane dostupný pouze HTTPS přístup ze zdrojů private IPv4, IPv4 link-local/loopback, IPv6 link-local nebo IPv6 loopback. SSH, HTTP, mDNS, NTP, stahování z GitHubu a další provoz budou blokovány kromě minimálního DHCP/IPv6 řízení.',
    'settings.system.sections.systemLog': 'Protokolování',
    'settings.systemLog.remote.title': 'Vzdálené protokolování',
    'settings.systemLog.remote.forward': 'Předávat systémový protokol',
    'settings.systemLog.remote.description': 'Předávat systémové zprávy na vzdálený server',
    'settings.systemLog.kernel.title': 'Protokolování kernelu',
    'settings.systemLog.local.title': 'Buffer systémového protokolu',
    'settings.systemLog.remote.hostDesc': 'Název hostitele nebo adresa IPv4 serveru syslog',
    'settings.systemLog.kernel.enabledDesc': 'Zaznamenávat zprávy kernelu do systémového protokolu',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Minimální naléhavost zprávy kernelu pro výpis na konzoli',
    'settings.systemLog.local.priorityDesc': 'Minimální naléhavost zprávy pro zaznamenání',
    'settings.systemLog.local.bufferDesc': 'Velikost protokolu, při které se soubor rotuje',
    'settings.systemLog.local.rotationsDesc': 'Počet uchovávaných rotovaných souborů protokolu',
    'settings.systemLog.local.compactDesc': 'Vynechat z každého řádku název hostitele a facility',
    'settings.systemLog.local.stripTimestampsDesc':
      'Odebrat časová razítka přidaná odesílatelem; syslog přidá vlastní',
    'settings.systemLog.local.description':
      'Aktuální protokoly jsou uchovány v RAM v {{path}}, aby se zabránilo zápisům na SD kartu',
    'settings.systemLog.kernel.enabled': 'Předávat protokol kernelu',
    'settings.device.swap.size': 'Velikost swapu',
    'settings.device.swap.description': 'Používat odkládací soubor, když dochází paměť',
    'settings.device.swap.sizeDescription': 'Nastavte velikost odkládacího souboru',
    'settings.device.sections.connectivity': 'Připojení',
    'settings.device.sections.hostConnection': 'Připojení k hostiteli',
    'settings.device.sections.inputOutput': 'Vstup a výstup',
    'settings.device.sections.optimizations': 'Optimalizace',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'Časový limit OLED',
    'settings.device.oled.keepOn': 'Nechat OLED zapnutý',
    'settings.device.oled.keepOnDescription': 'Nikdy nevypínat obrazovku OLED',
    'settings.device.sessionLock.title': 'Zamknout relaci při nečinnosti'
  },
  da: {
    'auth.illegalPassword':
      'Adgangskoden skal være på mindst 8 tegn og må ikke indeholde anførselstegn eller skråstreger',
    'screen.videoDirectTips':
      'Aktivér HTTPS under "Indstillinger > System > Netværk" for at bruge denne tilstand',
    'download.disabled':
      'Billeder kan ikke downloades eller uploades lige nu, fordi lageret ikke kan skrives til. Hvis et billede er monteret, skal du afmontere det og derefter slukke den virtuelle disk, så lageret igen kan skrives til.',
    'auth.placeholderPassword': 'Indtast adgangskode',
    'auth.placeholderPassword2': 'Indtast adgangskode igen',
    'auth.noEmptyUsername': 'Brugernavn må ikke være tomt',
    'auth.noEmptyPassword': 'Adgangskode må ikke være tom',
    'auth.invalidUser': 'Ugyldigt brugernavn eller adgangskode',
    'auth.error': 'Uventet fejl',
    'auth.illegalUsername': 'Brugernavn indeholder ugyldige tegn',
    'keyboard.dropdownGerman': 'Tysk',
    'keyboard.dropdownRussian': 'Russisk',
    'image.loading': 'Indlæser...',
    'script.cancel': 'Nej',
    'power.cancelBtn': 'Nej',
    'settings.device.cancelBtn': 'Nej',
    'settings.account.cancelBtn': 'Nej',
    'screen.frameDetect': 'Billeddetektering',
    'image.usbReconnect': 'Tilslut USB igen',
    'image.usbReconnectSuccess': 'USB tilsluttet igen',
    'image.usbReconnectFailed': 'Kunne ikke tilslutte USB igen',
    'settings.tailscale.refresh': 'Opdater siden',
    'settings.device.oled.description': 'Sluk OLED-skærmen efter',
    'screen.transferRunningTitle': 'Billedoverførsel i gang',
    'screen.transferRunningDesc':
      'Hvis du skifter videotilstand, genindlæses siden, og den igangværende upload eller download af billedet annulleres.',
    'screen.transferRunningOk': 'Skift tilstand',
    'settings.device.diskTransferRunning':
      'Der er en billedoverførsel i gang. Vent, til den er færdig, før du aktiverer den virtuelle disk.',
    'settings.update.previewChannels':
      'Styrer både forhåndsvisningskanalerne for programmet og systemet',
    'settings.update.system.appUpdateRequired':
      'Opdater programmet til {{version}}, før du installerer denne systemopdatering',
    'settings.update.system.requiredAppVersion': 'Påkrævet programversion',
    'settings.device.diskDesc': 'Monter SD-kortet på den eksterne vært',
    'settings.device.diskCancelMount':
      'Hvis du aktiverer den virtuelle disk, annulleres det monterede billede. Fortsæt?',
    'image.diskOnWarn':
      'Når billedet monteres, slukkes den virtuelle disk, så computeren ikke længere har adgang til /data. Fortsæt?',
    'image.diskOffWarn':
      'Den virtuelle disk er slukket og skal aktiveres for at montere billedet. USB-enhederne på computeren genopregistreres. Fortsæt?',
    'download.diskShared': 'Sluk først den virtuelle disk, og brug derefter billeddownloaden',
    'download.diskOff': 'Sluk den virtuelle disk',
    'settings.device.diskLocked':
      'Slukket, mens et billede er monteret, og aktivering annullerer monteringen',
    'settings.tailscale.memory.tip':
      'Når hukommelsesforbruget overstiger grænsen, kører garbage collection mere aggressivt for at frigøre hukommelse. Tailscale skal genstartes, for at ændringen træder i kraft.',
    'settings.tailscale.restart': 'Genstart Tailscale?',
    'settings.tailscale.stop': 'Stop Tailscale?',
    'settings.tailscale.stopDesc': 'Log ud og slå automatisk start fra.',
    'settings.tailscale.okBtn': 'Ja',
    'settings.tailscale.cancelBtn': 'Nej',
    'wifi.success': "Gå hen til enheden og kontrollér NanoKVM's netværksstatus",
    'settings.system.firewall.enableHttpsFirst':
      'Aktivér HTTPS, før du aktiverer firewalltilstanden Begrænset eller Paranoid',
    'settings.system.firewall.httpsRequired':
      'Tilstandene Begrænset og Paranoid er deaktiveret, indtil HTTPS er aktiveret under Indstillinger > System > Netværk',
    'settings.system.firewall.mode.baselineDesc':
      'Åben kompatibilitetsprofil. Firewallen kører, men indgående kilder er ikke begrænset. Brug kun på betroede netværk.',
    'settings.system.firewall.mode.moderateDesc':
      'Standardprofil. Bevarer Basis-tjenesterne, men accepterer kun nye indgående forbindelser fra private, link-local- eller loopback-intervaller. Udgående adgang forbliver åben.',
    'settings.system.firewall.mode.paranoidDesc':
      'Kun lokal HTTPS-adgang. Blokerer SSH, HTTP, onlineopdateringer og andre udgående netværksfunktioner. Upload af offlineopdateringer og allerede klargjorte installationer er stadig tilgængelige.',
    'settings.system.firewall.mode.current': 'Nuværende',
    'settings.system.firewall.mode.default': 'Standard',
    'settings.system.firewall.mode.localOnly': 'Kun lokalt',
    'settings.system.firewall.mode.openTag': 'Indgående åben',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS påkrævet',
    'settings.system.firewall.mode.outboundOpen': 'Udgående åben',
    'settings.system.firewall.mode.outboundLimited': 'Udgående begrænset',
    'settings.system.firewall.mode.httpsOnly': 'Kun HTTPS',
    'settings.system.firewall.moderate.apply': 'Skift til Moderat',
    'settings.system.firewall.baseline.apply': 'Skift til Basis',
    'settings.system.firewall.baseline.confirmTitle': 'Skifte til den åbne tilstand Basis?',
    'settings.system.firewall.baseline.confirmDesc':
      'Firewalltjenesten forbliver aktiv, men begrænsningen til lokale kildeintervaller fjernes. Offentlige kildeintervaller kan nå eksponerede NanoKVM-tjenester, hvis netværket router dem.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC er deaktiveret i firewalltilstandene Begrænset og Paranoid',
    'settings.system.firewall.mode.baseline': 'Basis',
    'settings.system.firewall.mode.moderate': 'Moderat',
    'settings.system.firewall.mode.restricted': 'Begrænset',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Aktivér Begrænset',
    'settings.system.firewall.restricted.confirmTitle': 'Aktivér firewalltilstanden Begrænset?',
    'settings.system.firewall.paranoid.enable': 'Aktivér Paranoid',
    'settings.system.firewall.paranoid.confirmTitle': 'Aktivér firewalltilstanden Paranoid?',
    'settings.update.paranoidBlocked': 'Onlineopdateringer blokeres af firewalltilstanden Paranoid',
    'settings.device.hidOnlyDesc':
      'Forbedrer kompatibiliteten med værten, hvis mus eller tastatur holder op med at reagere',
    'mouse.hidOnly.desc':
      'Hvis mus eller tastatur holder op med at reagere, og nulstilling af HID ikke hjælper, kan det være et kompatibilitetsproblem mellem NanoKVM og værten.',
    'settings.device.hidOnlyTip':
      'HID-Only-tilstand stopper emuleringen af virtuelle enheder og beholder kun grundlæggende HID-kontrol',
    'settings.device.ssh.tip':
      'Indstil en stærk adgangskode under Konto > Adgangskode, før du aktiverer denne indstilling',
    'keyboard.shortcut.captureTips':
      'Optagelse af systemtaster, såsom Windows-tasten, kræver fuldskærmstilladelse',
    'image.tips.usb2':
      'Sørg for, at den virtuelle disk er monteret under Indstillinger > Enhed > Virtuel disk.',
    'image.tips.tf2':
      'Tag TF-kortet ud af din NanoKVM. På FULL-versionen skal du først åbne enheden.',
    'auth.tips.change3': 'Systemets root-adgangskode til SSH-login',
    'download.sha256': 'Valgfri SHA-256-kontrolsum',
    'power.powerShort': 'Tænd/sluk-knap: kort tryk',
    'power.powerLong': 'Tænd/sluk-knap: langt tryk',
    'settings.tailscale.notInstall':
      'Tailscale ikke fundet. Installer det for at fuldføre opsætningen.',
    'settings.tailscale.retry': 'Opdater siden og prøv igen, eller installer manuelt.',
    'wifi.failed': 'Handlingen mislykkedes, prøv igen',
    'screen.webrtcConnectionFailed.description':
      'Kontrollér netværksforbindelsen, eller skift videotilstand',
    'keyboard.shortcut.enterFullScreen': 'Skift fuldskærmstilstand',
    'keyboard.leaderKey.desc':
      'Omgå browserbegrænsninger og send systemgenveje direkte til fjernværten',
    'image.mountDesc':
      'På nogle systemer kan det være nødvendigt at skubbe den virtuelle disk ud på fjerncomputeren før du kan montere diskbilledet',
    'image.unmountDesc':
      'På nogle systemer skal du manuelt skubbe ud fra fjernværten, før du afmonterer billedet',
    'auth.totp.prompt': 'Indtast den 6-cifrede kode fra din godkendelsesapp',
    'auth.totp.backupPrompt': 'Indtast en af dine backupkoder',
    'auth.setupRecovery': 'Hvis adgangskoden mistes, kræver gendannelse at SD-kortet skrives igen',
    'download.remoteDisabled': 'Ekstern ISO-download er deaktiveret under Indstillinger > Udseende',
    'settings.device.usbWakeupDesc': 'Tillad tastatur- eller musehændelser at vække fjernværten',
    'settings.device.usbWakeupTip': 'Slå fra, hvis værten logger gentagne USB wakeup-meddelelser',
    'settings.network.tls.tip':
      'Bemærk: Brug af HTTPS kan øge forsinkelsen, især med MJPEG-videotilstand',
    'settings.system.time.servers.description':
      'Brug standardens offentlige servere, din lokale router eller egne NTP-servere',
    'settings.systemLog.remote.protocol': 'UDP-syslog bruges af den aktuelle BusyBox syslogd',
    'settings.systemLog.viewer.truncated': 'Kun de seneste logdata vises',
    'settings.update.system.rawEnableDesc':
      'Tillad at verificerede raw boot/rootfs-images skrives til SD-kortet fra denne skærm',
    'settings.account.totp.description':
      'Kræv en tidsbaseret kode fra en godkendelsesapp ud over din adgangskode',
    'settings.account.totp.requireDescription':
      'Når den er slået til, kan totrinsgodkendelse ikke deaktiveres, og en konto uden skal opsætte den, før enheden kan bruges',
    'picoclaw.empty': 'Åbn panelet og start en opgave for at begynde',
    'picoclaw.agent.defaultDescription': 'Generel hjælp til chat, søgning og arbejdsområde',
    'picoclaw.agent.kvmDescription': 'Betjen fjernværten gennem NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime blev afinstalleret',
    'picoclaw.install.uninstallFailed': 'Afinstallation mislykkedes',
    'settings.device.swap.tip':
      'Aktivering af denne funktion kan forkorte dit SD-korts brugbare levetid',
    'settings.update.previewTip':
      'Vær opmærksom på, at forhåndsvisningsudgivelser kan indeholde fejl eller ufuldstændig funktionalitet',
    'auth.changePasswordDesc':
      'For sikkerheden af din enhed, bedes du ændre web-login adgangskoden',
    'settings.network.dns.manualServersDescription': 'IPv4- og IPv6-servere understøttes',
    'terminal.unlockDesc': 'Indtast adgangskoden til webkontoen for at starte en terminalsession',
    'terminal.locked': 'For mange forsøg. Prøv igen senere',
    'wol.sending': 'Sender Wake-on-LAN magic packet...',
    'keyboard.dropdownKorean': 'Koreansk',
    'keyboard.dropdownJapanese': 'Japansk',
    'keyboard.localInput': 'Input fra mobiltastatur',
    'settings.network.configuration': 'Konfiguration',
    'settings.network.dns.servers': 'Servere',
    'settings.system.firewall.mode.restrictedDesc':
      'Kun lokal HTTPS og SSH samt udgående DNS, NTP, syslog og onlineopdateringer. DHCP og nødvendig IPv6-trafik forbliver tilgængelig. WebRTC er blokeret.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'Indgående administrativ adgang begrænses til private IPv4-, IPv4 link-local/loopback-, IPv6 link-local- eller IPv6 loopback-kilder for HTTPS og SSH. Offentlige kildeområder tillades ikke. Udgående DNS, NTP, fjern-syslog, onlineopdateringer, DHCP, etablerede forbindelser og nødvendig IPv6-kontroltrafik forbliver tilgængelige. WebRTC/ICE UDP og anden ind-/udgående trafik blokeres.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Kun HTTPS-adgang fra private IPv4, IPv4 link-local/loopback, IPv6 link-local eller IPv6 loopback forbliver tilgængelig. SSH, HTTP, mDNS, NTP, GitHub-downloads og anden trafik blokeres bortset fra minimal DHCP/IPv6-kontroltrafik.',
    'settings.system.sections.systemLog': 'Logning',
    'settings.systemLog.remote.title': 'Fjernlogning',
    'settings.systemLog.remote.forward': 'Videresend systemlog',
    'settings.systemLog.remote.description': 'Videresend systemmeddelelser til en fjernserver',
    'settings.systemLog.kernel.title': 'Kernellogning',
    'settings.systemLog.local.title': 'Systemlogbuffer',
    'settings.systemLog.remote.hostDesc': 'Værtsnavn eller IPv4-adresse på syslog-serveren',
    'settings.systemLog.kernel.enabledDesc': 'Opfang kernelmeddelelser i systemloggen',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Mindste hastegrad for at en kernelmeddelelse udskrives på konsollen',
    'settings.systemLog.local.priorityDesc': 'Mindste hastegrad for at en meddelelse logges',
    'settings.systemLog.local.bufferDesc': 'Logstørrelse, hvor filen roteres',
    'settings.systemLog.local.rotationsDesc': 'Antal roterede logfiler, der gemmes',
    'settings.systemLog.local.compactDesc': 'Udelad værtsnavn og facility fra hver linje',
    'settings.systemLog.local.stripTimestampsDesc':
      'Fjern tidsstempler tilføjet af afsenderen; syslog tilføjer sine egne',
    'settings.systemLog.local.description':
      'Aktuelle logs opbevares i RAM på {{path}} for at undgå skrivninger til SD-kortet',
    'settings.systemLog.kernel.enabled': 'Videresend kernellog',
    'settings.device.swap.size': 'Swap-størrelse',
    'settings.device.swap.description': 'Brug en swap-fil, når hukommelsen er ved at slippe op',
    'settings.device.swap.sizeDescription': 'Indstil swap-filstørrelsen',
    'settings.device.sections.connectivity': 'Forbindelser',
    'settings.device.sections.hostConnection': 'Værtsforbindelse',
    'settings.device.sections.inputOutput': 'Input og output',
    'settings.device.sections.optimizations': 'Optimeringer',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'OLED-timeout',
    'settings.device.oled.keepOn': 'Hold OLED tændt',
    'settings.device.oled.keepOnDescription': 'Sluk aldrig OLED-skærmen',
    'settings.device.sessionLock.title': 'Lås session ved inaktivitet'
  },
  de: {
    'auth.illegalPassword':
      'Das Passwort muss mindestens 8 Zeichen lang sein und darf keine Anführungszeichen oder Schrägstriche enthalten',
    'screen.videoDirectTips':
      'Aktivieren Sie HTTPS unter „Einstellungen > System > Netzwerk“, um diesen Modus zu verwenden',
    'download.disabled':
      'Images können derzeit weder heruntergeladen noch hochgeladen werden, da der Speicher nicht beschreibbar ist. Wenn ein Image eingebunden ist, binden Sie es aus und schalten Sie dann die virtuelle Festplatte aus, damit der Speicher wieder beschreibbar ist.',
    'keyboard.tips': 'Nur Standardbuchstaben und -symbole der Tastatur werden unterstützt',
    'script.runFailed': 'Ausführung fehlgeschlagen',
    'mouse.hide': 'Cursor ausblenden',
    'mouse.scrollDown': 'Nach unten scrollen',
    'keyboard.shortcut.clear': 'Löschen',
    'keyboard.shortcut.title': 'Tastenkombinationen',
    'image.unmountFailed': 'Aushängen fehlgeschlagen',
    'menu.collapse': 'Menü einklappen',
    'menu.expand': 'Menü ausklappen',
    'settings.device.ssh.tip':
      'Legen Sie unter Konto > Passwort ein starkes Passwort fest, bevor Sie diese Option aktivieren',
    'settings.tailscale.upTailscale': 'tailscale nach /usr/bin/ auf NanoKVM hochladen',
    'settings.tailscale.upTailscaled': 'tailscaled nach /usr/sbin/ auf NanoKVM hochladen',
    'screen.frameDetect': 'Änderungserkennung',
    'settings.device.diskDesc': 'SD-Karte am entfernten Host einbinden',
    'settings.device.diskCancelMount':
      'Das Aktivieren der virtuellen Festplatte bricht das eingebundene Image ab. Fortfahren?',
    'screen.transferRunningTitle': 'Image-Übertragung läuft',
    'screen.transferRunningDesc':
      'Beim Wechsel des Videomodus wird die Seite neu geladen, wodurch der laufende Image-Upload oder -Download abgebrochen wird.',
    'screen.transferRunningOk': 'Modus wechseln',
    'settings.device.diskTransferRunning':
      'Eine Image-Übertragung läuft. Warten Sie, bis sie beendet ist, bevor Sie die virtuelle Festplatte aktivieren.',
    'settings.update.previewChannels':
      'Steuert sowohl den Vorabversions-Kanal der Anwendung als auch den des Systems',
    'settings.update.system.appUpdateRequired':
      'Aktualisieren Sie die Anwendung auf {{version}}, bevor Sie dieses Systemupdate installieren',
    'settings.update.system.requiredAppVersion': 'Erforderliche Anwendungsversion',
    'settings.system.firewall.enableHttpsFirst':
      'HTTPS aktivieren, bevor der Firewall-Modus Eingeschränkt oder Paranoid aktiviert wird',
    'settings.system.firewall.httpsRequired':
      'Die Modi Eingeschränkt und Paranoid sind deaktiviert, bis HTTPS unter Einstellungen > System > Netzwerk aktiviert wird',
    'settings.system.firewall.mode.baselineDesc':
      'Offenes Kompatibilitätsprofil. Die Firewall läuft, aber eingehende Quellen werden nicht eingeschränkt. Nur in vertrauenswürdigen Netzwerken verwenden.',
    'settings.system.firewall.mode.moderateDesc':
      'Standardprofil. Behält die Basis-Dienste bei, nimmt neue eingehende Verbindungen aber nur aus privaten, Link-Local- oder Loopback-Bereichen an. Ausgehender Zugriff bleibt offen.',
    'settings.system.firewall.mode.paranoidDesc':
      'Nur lokaler HTTPS-Zugriff. Blockiert SSH, HTTP, Online-Updates und andere ausgehende Netzwerkfunktionen. Das Hochladen von Offline-Updates und bereits bereitgestellte Installationen bleiben verfügbar.',
    'settings.system.firewall.mode.current': 'Aktuell',
    'settings.system.firewall.mode.default': 'Standard',
    'settings.system.firewall.mode.localOnly': 'Nur lokal',
    'settings.system.firewall.mode.openTag': 'Eingehend offen',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS erforderlich',
    'settings.system.firewall.mode.outboundOpen': 'Ausgehend offen',
    'settings.system.firewall.mode.outboundLimited': 'Ausgehend eingeschränkt',
    'settings.system.firewall.mode.httpsOnly': 'Nur HTTPS',
    'settings.system.firewall.moderate.apply': 'Zu Moderat wechseln',
    'settings.system.firewall.baseline.apply': 'Zu Basis wechseln',
    'settings.system.firewall.baseline.confirmTitle': 'Zum offenen Modus Basis wechseln?',
    'settings.system.firewall.baseline.confirmDesc':
      'Der Firewall-Dienst bleibt aktiv, aber die Beschränkung auf lokale Quellbereiche entfällt. Öffentliche Quellbereiche können exponierte NanoKVM-Dienste erreichen, wenn das Netzwerk sie weiterleitet.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC ist in den Firewall-Modi Eingeschränkt und Paranoid deaktiviert',
    'settings.system.firewall.mode.baseline': 'Basis',
    'settings.system.firewall.mode.moderate': 'Moderat',
    'settings.system.firewall.mode.restricted': 'Eingeschränkt',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Eingeschränkt aktivieren',
    'settings.system.firewall.restricted.confirmTitle': 'Firewall-Modus Eingeschränkt aktivieren?',
    'settings.system.firewall.paranoid.enable': 'Paranoid aktivieren',
    'settings.system.firewall.paranoid.confirmTitle': 'Firewall-Modus Paranoid aktivieren?',
    'settings.update.paranoidBlocked':
      'Online-Updates werden vom Firewall-Modus Paranoid blockiert',
    'settings.device.hidOnlyDesc':
      'Verbessert die Kompatibilität mit dem Host, wenn Maus oder Tastatur nicht mehr reagieren',
    'mouse.hidOnly.desc':
      'Wenn Maus oder Tastatur nicht mehr reagieren und ein Zurücksetzen von HID nicht hilft, kann ein Kompatibilitätsproblem zwischen dem NanoKVM und dem Host vorliegen.',
    'settings.device.hidOnlyTip':
      'Der HID-Only-Modus beendet die Emulation virtueller Geräte und behält nur die grundlegende HID-Steuerung bei',
    'keyboard.shortcut.captureTips':
      'Das Erfassen systemweiter Tasten, z. B. der Windows-Taste, erfordert die Vollbildberechtigung',
    'settings.device.diskLocked':
      'Aus, solange ein Image eingebunden ist, und Einschalten bricht die Einbindung ab',
    'image.tips.usb2':
      'Stellen Sie sicher, dass die virtuelle Festplatte unter Einstellungen > Gerät > Virtuelle Festplatte eingebunden ist.',
    'image.tips.tf2':
      'Entnehmen Sie die TF-Karte aus dem NanoKVM. Bei der FULL-Version muss zuvor das Gehäuse geöffnet werden.',
    'auth.tips.change3': 'System-Root-Passwort für die SSH-Anmeldung',
    'download.sha256': 'Optionale SHA-256-Prüfsumme',
    'power.powerShort': 'Power-Taste: kurzer Klick',
    'power.powerLong': 'Power-Taste: langer Klick',
    'settings.tailscale.notInstall': 'Tailscale nicht gefunden. Bitte installieren.',
    'settings.tailscale.retry':
      'Bitte Seite neu laden und erneut versuchen oder manuell installieren.',
    'wifi.success':
      'Bitte überprüfen Sie den Netzwerk-Status des NanoKVM und greifen Sie über die neue IP Adresse darauf zu',
    'wifi.failed': 'Aktion fehlgeschlagen, bitte erneut versuchen',
    'screen.webrtcConnectionFailed.description':
      'Überprüfen Sie die Netzwerkverbindung oder wechseln Sie den Videomodus',
    'keyboard.shortcut.enterFullScreen': 'Vollbildmodus umschalten',
    'keyboard.leaderKey.desc':
      'Browserbeschränkungen umgehen und Systemverknüpfungen direkt an den Remote-Host senden',
    'image.mountDesc':
      'In einigen Systemen ist es notwendig, die virtuelle Festplatte auf dem entfernten Host auszuwerfen, bevor das Image eingebunden werden kann',
    'image.unmountDesc':
      'Auf einigen Systemen müssen Sie das Image manuell vom Remote-Host auswerfen, bevor Sie die Bereitstellung aufheben',
    'auth.totp.prompt': 'Geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein',
    'auth.totp.backupPrompt': 'Geben Sie einen Ihrer Backup-Codes ein',
    'auth.setupRecovery':
      'Wenn dieses Passwort verloren geht, muss zur Wiederherstellung die SD-Karte neu geschrieben werden',
    'download.diskShared':
      'Schalten Sie zuerst das virtuelle Laufwerk aus und verwenden Sie dann den Image-Download',
    'download.remoteDisabled':
      'Remote-ISO-Download ist unter Einstellungen > Darstellung deaktiviert',
    'settings.device.usbWakeupDesc':
      'Erlaubt Tastatur- oder Mausereignissen, den Remote-Host aufzuwecken',
    'settings.device.usbWakeupTip':
      'Ausschalten, wenn der Host wiederholt USB-Wakeup-Meldungen protokolliert',
    'settings.network.tls.tip':
      'Hinweis: Die Verwendung von HTTPS kann die Latenz erhöhen, besonders im MJPEG-Videomodus',
    'settings.system.time.servers.description':
      'Öffentliche Standardserver, den lokalen Router oder eigene NTP-Server verwenden',
    'settings.systemLog.remote.protocol': 'UDP-Syslog wird vom aktuellen BusyBox syslogd verwendet',
    'settings.systemLog.viewer.truncated': 'Nur die neuesten Protokolldaten werden angezeigt',
    'settings.update.system.rawEnableDesc':
      'Erlaubt, verifizierte raw Boot-/Rootfs-Images von diesem Bildschirm auf die SD-Karte zu schreiben',
    'settings.account.totp.description':
      'Zusätzlich zum Passwort einen zeitbasierten Code aus einer Authenticator-App verlangen',
    'settings.account.totp.requireDescription':
      'Solange diese Option aktiv ist, kann die Zwei-Faktor-Authentifizierung nicht deaktiviert werden, und ein Konto ohne sie muss sie einrichten, bevor es das Gerät nutzen kann',
    'picoclaw.empty': 'Öffnen Sie das Bedienfeld und starten Sie eine Aufgabe',
    'picoclaw.agent.defaultDescription': 'Allgemeine Chat-, Such- und Arbeitsbereichshilfe',
    'picoclaw.agent.kvmDescription': 'Betreiben Sie den Remote-Host über NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime erfolgreich deinstalliert',
    'picoclaw.install.uninstallFailed': 'Deinstallation fehlgeschlagen',
    'settings.device.swap.tip':
      'Das Aktivieren dieser Funktion kann die Lebensdauer Ihrer SD-Karte verkürzen',
    'settings.update.previewTip':
      'Bitte beachten Sie, dass Vorab-Versionen womöglich noch Fehler oder unvollständige Funktionen enthalten',
    'auth.changePasswordDesc': 'Für die Sicherheit Ihres Geräts ändern Sie bitte das Passwort',
    'settings.network.dns.manualServersDescription': 'IPv4- und IPv6-Server werden unterstützt',
    'settings.tailscale.stopDesc': 'Abmelden und Autostart deaktivieren.',
    'mouse.hidOnly.tip3':
      'NanoKVM wird nach dem Wechsel in den neuen Modus automatisch neu gestartet',
    'image.tips.tf1': 'Diese Methode wird unter Linux-Systemen unterstützt',
    'terminal.unlockDesc':
      'Geben Sie das Passwort Ihres Webkontos ein, um eine Terminalsitzung zu starten',
    'terminal.locked': 'Zu viele Versuche. Bitte später erneut versuchen',
    'keyboard.dropdownKorean': 'Koreanisch',
    'keyboard.dropdownJapanese': 'Japanisch',
    'settings.device.ssh.description': 'Entfernten SSH-Zugang aktivieren',
    'settings.device.oled.description': 'OLED-Bildschirm ausschalten nach',
    'settings.device.networkDesc': 'Virtuelle Netzwerkkarte an den entfernten Host binden',
    'settings.account.totp.enableDescription':
      'Bestätigen Sie Ihr Passwort, um fortzufahren. Es ist bei jeder Änderung des zweiten Faktors erforderlich.',
    'settings.account.totp.disableDescription':
      'Ihr Konto ist dann nur noch durch das Passwort geschützt. Bestätigen Sie mit Ihrem Passwort, um fortzufahren.',
    'settings.account.totp.scan': 'Scannen Sie dies mit Ihrer Authenticator-App.',
    'settings.account.totp.codePlaceholder': 'Geben Sie den 6-stelligen Code zur Bestätigung ein',
    'settings.account.totp.backupTitle': 'Speichern Sie jetzt Ihre Backup-Codes',
    'settings.account.totp.backupDescription':
      'Jeder Code funktioniert nur einmal und wird nicht erneut angezeigt. Die Codes sind der einzige Weg zurück, wenn Sie Ihre Authenticator-App verlieren, und sie funktionieren auch, wenn die Uhr des Geräts nicht synchronisiert ist.',
    'settings.account.totp.clockUnsynced':
      'Die Uhr des Geräts ist noch nicht synchronisiert. Synchronisieren Sie die Zeit unter Einstellungen > System > Zeit, bevor Sie die Einrichtung starten.',
    'settings.account.totp.noBackupCodes':
      'Es sind keine Backup-Codes mehr übrig. Wählen Sie „Erzeugen“, um einen neuen Satz auszustellen.',
    'settings.account.totp.regenerateDescription':
      'Ihre aktuellen Backup-Codes funktionieren dann nicht mehr. Bestätigen Sie mit Ihrem Passwort, um fortzufahren.',
    'settings.account.totp.requiredDescription':
      'Dieses Gerät verlangt einen zweiten Faktor, aber Ihr Konto hat noch keinen eingerichtet. Richten Sie ihn jetzt ein, um fortzufahren.',
    'settings.account.totp.manualEntry': 'Oder geben Sie diesen Schlüssel manuell ein:',
    'keyboard.localInput': 'Eingabe über die Mobiltastatur',
    'settings.network.configuration': 'Konfiguration',
    'settings.network.dns.servers': 'Server',
    'settings.system.firewall.mode.restrictedDesc':
      'Nur lokales HTTPS und SSH sowie ausgehendes DNS, NTP, Syslog und Online-Updates. DHCP und wichtiger IPv6-Verkehr bleiben verfügbar. WebRTC ist blockiert.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'Eingehender Adminzugriff wird für HTTPS und SSH auf private IPv4-, IPv4 link-local/loopback-, IPv6 link-local- oder IPv6 loopback-Quellbereiche begrenzt. Öffentliche Quellbereiche sind nicht erlaubt. Ausgehendes DNS, NTP, Remote-Syslog, Online-Updates, DHCP, bestehende Verbindungen und notwendiger IPv6-Steuerverkehr bleiben verfügbar. WebRTC/ICE UDP und anderer ein-/ausgehender Verkehr werden blockiert.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Nur HTTPS-Zugriff aus privaten IPv4-, IPv4 link-local/loopback-, IPv6 link-local- oder IPv6 loopback-Quellbereichen bleibt verfügbar. SSH, HTTP, mDNS, NTP, GitHub-Downloads und anderer Verkehr werden außer minimalem DHCP/IPv6-Steuerverkehr blockiert.',
    'settings.system.sections.systemLog': 'Protokollierung',
    'settings.systemLog.remote.title': 'Remote-Protokollierung',
    'settings.systemLog.remote.forward': 'Systemprotokoll weiterleiten',
    'settings.systemLog.remote.description': 'Systemmeldungen an einen Remote-Server weiterleiten',
    'settings.systemLog.kernel.title': 'Kernel-Protokollierung',
    'settings.systemLog.local.title': 'Systemprotokoll-Puffer',
    'settings.systemLog.remote.hostDesc': 'Hostname oder IPv4-Adresse des Syslog-Servers',
    'settings.systemLog.kernel.enabledDesc': 'Kernel-Meldungen im Systemprotokoll erfassen',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Mindestdringlichkeit, damit eine Kernel-Meldung auf der Konsole ausgegeben wird',
    'settings.systemLog.local.priorityDesc':
      'Mindestdringlichkeit, damit eine Meldung protokolliert wird',
    'settings.systemLog.local.bufferDesc': 'Protokollgröße, ab der die Datei rotiert wird',
    'settings.systemLog.local.rotationsDesc': 'Anzahl der aufbewahrten rotierten Protokolldateien',
    'settings.systemLog.local.compactDesc': 'Hostname und Facility in jeder Zeile weglassen',
    'settings.systemLog.local.stripTimestampsDesc':
      'Vom Absender hinzugefügte Zeitstempel entfernen; Syslog fügt eigene hinzu',
    'settings.systemLog.local.description':
      'Aktuelle Protokolle werden im RAM unter {{path}} gehalten, um Schreibzugriffe auf die SD-Karte zu vermeiden',
    'settings.systemLog.kernel.enabled': 'Kernelprotokoll weiterleiten',
    'settings.device.swap.size': 'Swap-Größe',
    'settings.device.swap.description': 'Eine Swap-Datei nutzen, wenn der Speicher knapp wird',
    'settings.device.swap.sizeDescription': 'Grösse der Swap-Datei festlegen',
    'settings.device.sections.connectivity': 'Konnektivität',
    'settings.device.sections.hostConnection': 'Host-Verbindung',
    'settings.device.sections.inputOutput': 'Eingabe und Ausgabe',
    'settings.device.sections.optimizations': 'Optimierungen',
    'settings.device.minutes': 'Min.',
    'settings.device.oled.title': 'OLED-Timeout',
    'settings.device.oled.keepOn': 'OLED eingeschaltet lassen',
    'settings.device.oled.keepOnDescription': 'Den OLED-Bildschirm nie ausschalten',
    'settings.device.sessionLock.title': 'Sitzung bei Inaktivität sperren'
  },
  es: {
    'auth.illegalPassword':
      'La contraseña debe tener al menos 8 caracteres y no puede contener comillas ni barras',
    'screen.videoDirectTips': 'Activa HTTPS en "Ajustes > Sistema > Red" para usar este modo',
    'download.disabled':
      'Ahora mismo no se pueden descargar ni subir imágenes porque el almacenamiento no es escribible. Si hay una imagen montada, desmóntala y después desactiva el disco virtual para que el almacenamiento vuelva a ser escribible.',
    'auth.illegalUsername': 'El nombre de usuario contiene caracteres no permitidos',
    'keyboard.dropdownRussian': 'Ruso',
    'settings.device.diskDesc': 'Montar la tarjeta SD en el host remoto',
    'settings.device.diskCancelMount':
      'Activar el disco virtual cancela la imagen montada. ¿Continuar?',
    'screen.transferRunningTitle': 'Transferencia de imagen en curso',
    'screen.transferRunningDesc':
      'Cambiar el modo de vídeo recarga la página, lo que cancela la subida o descarga de imagen en curso.',
    'screen.transferRunningOk': 'Cambiar modo',
    'settings.device.diskTransferRunning':
      'Hay una transferencia de imagen en curso. Espera a que termine antes de activar el disco virtual.',
    'settings.update.previewChannels':
      'Controla tanto el canal de vista previa de la aplicación como el del sistema',
    'settings.update.system.appUpdateRequired':
      'Actualiza la aplicación a {{version}} antes de instalar esta actualización del sistema',
    'settings.update.system.requiredAppVersion': 'Versión de aplicación requerida',
    'settings.system.firewall.enableHttpsFirst':
      'Activa HTTPS antes de activar el modo de firewall Restringido o Paranoico',
    'settings.system.firewall.httpsRequired':
      'Los modos Restringido y Paranoico están desactivados hasta que se active HTTPS en Ajustes > Sistema > Red',
    'settings.system.firewall.mode.baselineDesc':
      'Perfil abierto de compatibilidad. El cortafuegos está activo, pero los orígenes entrantes no se restringen. Úsalo solo en redes de confianza.',
    'settings.system.firewall.mode.moderateDesc':
      'Perfil predeterminado. Mantiene los servicios de Base, pero solo acepta nuevas conexiones entrantes de rangos privados, link-local o loopback. El acceso saliente sigue abierto.',
    'settings.system.firewall.mode.paranoidDesc':
      'Acceso HTTPS solo local. Bloquea SSH, HTTP, las actualizaciones en línea y otras funciones de red de salida. La subida de actualizaciones sin conexión y las instalaciones ya preparadas siguen disponibles.',
    'settings.system.firewall.mode.current': 'Actual',
    'settings.system.firewall.mode.default': 'Predeterminado',
    'settings.system.firewall.mode.localOnly': 'Solo local',
    'settings.system.firewall.mode.openTag': 'Entrada abierta',
    'settings.system.firewall.mode.httpsRequiredTag': 'Requiere HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Salida abierta',
    'settings.system.firewall.mode.outboundLimited': 'Salida limitada',
    'settings.system.firewall.mode.httpsOnly': 'Solo HTTPS',
    'settings.system.firewall.moderate.apply': 'Cambiar a Moderado',
    'settings.system.firewall.baseline.apply': 'Cambiar a Base',
    'settings.system.firewall.baseline.confirmTitle': '¿Cambiar al modo Base abierto?',
    'settings.system.firewall.baseline.confirmDesc':
      'El servicio de firewall sigue activo, pero se elimina la restricción a rangos de origen solo locales. Los rangos de origen públicos pueden llegar a los servicios expuestos de NanoKVM si la red los enruta.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC está desactivado en los modos de firewall Restringido y Paranoico',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Moderado',
    'settings.system.firewall.mode.restricted': 'Restringido',
    'settings.system.firewall.mode.paranoid': 'Paranoico',
    'settings.system.firewall.restricted.enable': 'Activar Restringido',
    'settings.system.firewall.restricted.confirmTitle': '¿Activar el modo Restringido?',
    'settings.system.firewall.paranoid.enable': 'Activar Paranoico',
    'settings.system.firewall.paranoid.confirmTitle': '¿Activar el modo Paranoico?',
    'settings.update.paranoidBlocked':
      'Las actualizaciones en línea están bloqueadas por el modo de firewall Paranoico',
    'settings.device.hidOnlyDesc':
      'Mejora la compatibilidad con el host si el ratón o el teclado dejan de responder',
    'mouse.hidOnly.desc':
      'Si el ratón o el teclado dejan de responder y restablecer el HID no ayuda, podría tratarse de un problema de compatibilidad entre el NanoKVM y el host.',
    'settings.device.hidOnlyTip':
      'El modo HID-Only deja de emular dispositivos virtuales y conserva solo el control básico HID',
    'settings.device.ssh.tip':
      'Establece una contraseña segura en Cuenta > Contraseña antes de activar esta opción',
    'keyboard.shortcut.captureTips':
      'Capturar teclas del sistema, como la tecla Windows, requiere permiso de pantalla completa',
    'settings.device.diskLocked':
      'Desactivado mientras hay una imagen montada, y activarlo cancela el montaje',
    'image.tips.usb2':
      'Asegúrate de que el disco virtual esté montado en Ajustes > Dispositivo > Disco Virtual.',
    'image.tips.tf2':
      'Obtén la tarjeta TF del NanoKVM. En la versión FULL, desmonta primero la carcasa.',
    'auth.tips.change3': 'Contraseña root del sistema para el acceso por SSH',
    'download.sha256': 'Suma de comprobación SHA-256 opcional',
    'power.powerShort': 'Botón de encendido: pulsación corta',
    'power.powerLong': 'Botón de encendido: pulsación larga',
    'settings.tailscale.notInstall': 'Tailscale no encontrado. Por favor, instálalo.',
    'settings.tailscale.retry':
      'Por favor, actualiza la página e inténtalo de nuevo, o instala manualmente.',
    'wifi.success': 'Comprueba el estado de red del NanoKVM y accede a la nueva dirección IP',
    'wifi.failed': 'La operación ha fallado, vuelve a intentarlo',
    'screen.webrtcConnectionFailed.description':
      'Comprueba la conexión de red o cambia el modo de vídeo',
    'keyboard.shortcut.enterFullScreen': 'Alternar el modo de pantalla completa',
    'keyboard.leaderKey.desc':
      'Omite las restricciones del navegador y envía accesos directos al sistema directamente al host remoto',
    'image.mountDesc':
      'En algunos sistemas, es necesario expulsar el disco virtual del host remoto antes de montar una imagen',
    'image.unmountDesc':
      'En algunos sistemas, es necesario expulsar manualmente el disco virtual desde el host remoto antes de desmontar la imagen',
    'auth.totp.prompt': 'Introduce el código de 6 dígitos de tu aplicación de autenticación',
    'auth.totp.backupPrompt': 'Introduce uno de tus códigos de respaldo',
    'auth.setupRecovery':
      'Si se pierde esta contraseña, la recuperación requiere volver a grabar la tarjeta SD',
    'download.diskShared': 'Desactiva primero el disco virtual y luego usa la descarga de imágenes',
    'download.remoteDisabled': 'La descarga remota de ISO está desactivada en Ajustes > Apariencia',
    'settings.device.usbWakeupDesc':
      'Permite que eventos de teclado o ratón despierten el host remoto',
    'settings.device.usbWakeupTip': 'Desactívalo si el host registra mensajes USB wakeup repetidos',
    'settings.network.tls.tip':
      'Aviso: Usar HTTPS puede aumentar la latencia, especialmente en modo de vídeo MJPEG',
    'settings.system.time.servers.description':
      'Usa los servidores públicos predeterminados, tu router local o servidores NTP personalizados',
    'settings.systemLog.remote.protocol': 'El syslog UDP lo usa el syslogd actual de BusyBox',
    'settings.systemLog.viewer.truncated': 'Solo se muestran los datos de registro más recientes',
    'settings.update.system.rawEnableDesc':
      'Permite escribir imágenes raw verificadas de boot/rootfs en la tarjeta SD desde esta pantalla',
    'settings.account.totp.description':
      'Exige un código temporal de una aplicación de autenticación además de la contraseña',
    'settings.account.totp.requireDescription':
      'Mientras esté activado, la autenticación en dos pasos no se puede desactivar, y una cuenta que no la tenga deberá configurarla antes de usar el dispositivo',
    'picoclaw.empty': 'Abre el panel e inicia una tarea para comenzar',
    'picoclaw.agent.defaultDescription': 'Ayuda general para chat, búsqueda y espacio de trabajo',
    'picoclaw.agent.kvmDescription': 'Opere el host remoto a través de NanoKVM',
    'picoclaw.install.uninstalled': 'El tiempo de ejecución se desinstaló exitosamente',
    'picoclaw.install.uninstallFailed': 'Falló la desinstalación',
    'settings.device.swap.tip':
      'Habilitar esta función podría acortar la vida útil de tu tarjeta SD',
    'auth.changePasswordDesc':
      'Para la seguridad de tu dispositivo, por favor, modifica la contraseña de inicio de sesión en la web',
    'settings.network.dns.manualServersDescription': 'Se admiten servidores IPv4 e IPv6',
    'screen.autoTips':
      'En determinadas resoluciones pueden producirse desgarros de imagen o desplazamiento del ratón. Prueba a ajustar la resolución del host remoto o desactiva el modo automático.',
    'settings.tailscale.stopDesc': 'Cerrar sesión y desactivar el inicio automático.',
    'auth.noAccount':
      'No se ha encontrado la cuenta. Por favor, recarga la página o recupera tu contraseña',
    'terminal.unlockDesc':
      'Introduce la contraseña de tu cuenta web para iniciar una sesión de terminal',
    'terminal.locked': 'Demasiados intentos. Inténtalo más tarde',
    'keyboard.dropdownKorean': 'Coreano',
    'keyboard.dropdownJapanese': 'Japonés',
    'wifi.invalidMode':
      'El modo actual no admite la configuración de red. Ve a tu dispositivo y habilita el modo de configuración Wi-Fi.',
    'keyboard.shortcut.capture': 'Haz clic aquí para capturar el acceso directo',
    'keyboard.leaderKey.sequential.desc1':
      'Pulsa la tecla líder → pulsa el atajo en secuencia → vuelve a pulsar la tecla líder.',
    'keyboard.leaderKey.placeholder': 'Pulsa la tecla líder',
    'download.sha256Placeholder': 'Introduce una suma de comprobación SHA-256 de 64 caracteres',
    'settings.update.offline.invalidName':
      'Formato de nombre de archivo no válido. Descarga desde las versiones de GitHub.',
    'picoclaw.model.requiredDescription':
      'Configura el modelo PicoClaw antes de usar el chat PicoClaw.',
    'picoclaw.model.apiKeyPlaceholder': 'Introduce la clave API del modelo',
    'keyboard.localInput': 'Entrada del teclado móvil',
    'settings.network.configuration': 'Configuración',
    'settings.network.dns.servers': 'Servidores',
    'settings.system.firewall.mode.restrictedDesc':
      'HTTPS y SSH solo locales, más DNS, NTP, syslog y actualizaciones en línea salientes. DHCP y el tráfico IPv6 esencial siguen disponibles. WebRTC está bloqueado.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'El acceso administrativo entrante se limitará a rangos private IPv4, IPv4 link-local/loopback, IPv6 link-local o IPv6 loopback para HTTPS y SSH. No se permiten rangos públicos de origen. DNS, NTP, syslog remoto, actualizaciones online, DHCP, conexiones establecidas y tráfico esencial IPv6 salientes seguirán disponibles. WebRTC/ICE UDP y el resto del tráfico entrante/saliente se bloquearán.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Solo quedará disponible el acceso HTTPS desde rangos private IPv4, IPv4 link-local/loopback, IPv6 link-local o IPv6 loopback. SSH, HTTP, mDNS, NTP, descargas de GitHub y el resto del tráfico se bloquearán salvo el mínimo DHCP/control IPv6.',
    'settings.system.sections.systemLog': 'Registro',
    'settings.systemLog.remote.title': 'Registro remoto',
    'settings.systemLog.remote.forward': 'Reenviar el registro del sistema',
    'settings.systemLog.remote.description':
      'Reenvía los mensajes del sistema a un servidor remoto',
    'settings.systemLog.kernel.title': 'Registro del kernel',
    'settings.systemLog.local.title': 'Búfer del registro del sistema',
    'settings.systemLog.remote.hostDesc': 'Nombre de host o dirección IPv4 del servidor syslog',
    'settings.systemLog.kernel.enabledDesc':
      'Captura los mensajes del kernel en el registro del sistema',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Urgencia mínima para que un mensaje del kernel se imprima en la consola',
    'settings.systemLog.local.priorityDesc': 'Urgencia mínima para que un mensaje se registre',
    'settings.systemLog.local.bufferDesc':
      'Tamaño del registro a partir del cual se rota el archivo',
    'settings.systemLog.local.rotationsDesc':
      'Número de archivos de registro rotados que se conservan',
    'settings.systemLog.local.compactDesc': 'Omite el nombre de host y la facilidad de cada línea',
    'settings.systemLog.local.stripTimestampsDesc':
      'Elimina las marcas de tiempo añadidas por el emisor; syslog añade las suyas',
    'settings.systemLog.local.description':
      'Los registros actuales se mantienen en RAM en {{path}} para evitar escrituras en la tarjeta SD',
    'settings.systemLog.kernel.enabled': 'Reenviar el registro del kernel',
    'settings.device.swap.size': 'Tamaño de la memoria swap',
    'settings.device.swap.description': 'Usa un archivo swap cuando se agota la memoria',
    'settings.device.swap.sizeDescription': 'Establece el tamaño del archivo swap',
    'settings.device.sections.connectivity': 'Conectividad',
    'settings.device.sections.hostConnection': 'Conexión con el host',
    'settings.device.sections.inputOutput': 'Entrada y salida',
    'settings.device.sections.optimizations': 'Optimizaciones',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'Tiempo de espera de la OLED',
    'settings.device.oled.keepOn': 'Mantener la OLED encendida',
    'settings.device.oled.keepOnDescription': 'No apagar nunca la pantalla OLED',
    'settings.device.sessionLock.title': 'Bloquear sesión al estar inactiva'
  },
  et: {
    'settings.device.diskDesc': 'Ühenda SD-kaart kaugmasinasse',
    'screen.transferRunningTitle': "Image'i edastus käib",
    'screen.transferRunningDesc':
      "Videorežiimi muutmine laadib lehe uuesti, mis katkestab käimasoleva image'i üles- või allalaadimise.",
    'screen.transferRunningOk': 'Muuda režiimi',
    'settings.device.diskTransferRunning':
      "Käimas on image'i edastus. Oota selle lõppu, enne kui lubad virtuaalse ketta.",
    'settings.update.previewChannels': 'Juhib nii rakenduse kui ka süsteemi eelvaate kanaleid',
    'settings.update.system.appUpdateRequired':
      'Enne selle süsteemiuuenduse paigaldamist uuenda rakendus versioonile {{version}}',
    'settings.update.system.requiredAppVersion': 'Nõutav rakenduse versioon',
    'settings.device.diskCancelMount':
      "Virtuaalse ketta lubamine tühistab ühendatud image'i. Kas jätkata?",
    'image.diskOnWarn':
      "Image'i ühendamine lülitab virtuaalse ketta välja, nii et arvuti ei pääse enam ligi kataloogile /data. Kas jätkata?",
    'image.diskOffWarn':
      "Virtuaalne ketas on välja lülitatud ja see tuleb image'i ühendamiseks lubada. Arvuti USB-seadmed loendatakse uuesti. Kas jätkata?",
    'download.diskShared':
      "Lülita esmalt virtuaalne ketta välja ja kasuta seejärel image'i allalaadimist",
    'download.diskOff': 'Lülita virtuaalne ketas välja',
    'settings.device.diskLocked': 'Väljas, kui image on ühendatud, ja lubamine tühistab ühenduse',
    'screen.webrtcConnectionFailed.title': 'WebRTC-ühendus nurjus',
    'screen.webrtcConnectionFailed.description': 'Kontrolli võrguühendust või vaheta videorežiimi',
    'download.mountedImage':
      'See image on ühendatud. Enne sama nimega faili üleslaadimist eemalda see.',
    'download.sha256': 'Valikuline SHA-256 kontrollsumma',
    'download.sha256Placeholder': 'Sisesta 64-märgiline SHA-256 kontrollsumma',
    'download.invalidSHA256': 'SHA-256 peab olema 64-märgiline kuueteistkümnendsüsteemi sõne',
    'download.checksumFailed': 'Allalaadimine nurjus: SHA-256 kontroll ebaõnnestus',
    'settings.appearance.menuBar.keyboardLedStatus': 'Klaviatuuri lukustusnäidikud',
    'settings.appearance.menuBar.keyboardLedStatusDesc':
      'Kuva kaugarvuti Num Locki, Caps Locki ja Scroll Locki olek',
    'settings.keyboardLedStatus.groupLabel': 'Kaugklaviatuuri lukustuste olek',
    'settings.keyboardLedStatus.on': 'Sees',
    'settings.keyboardLedStatus.off': 'Väljas',
    'settings.keyboardLedStatus.unknown': 'Teadmata',
    'settings.device.hdmi.idleTimeoutTitle': 'Salvestuse jõudeaja piirang',
    'settings.device.hdmi.idleTimeoutDescription':
      'Peata HDMI salvestus, kui aktiivseid vaatajaid pole',
    'settings.system.firewall.enableHttpsFirst':
      'Luba HTTPS enne tulemüüri režiimi Piiratud või Paranoiline lubamist',
    'settings.system.firewall.httpsRequired':
      'Režiimid Piiratud ja Paranoiline on keelatud, kuni HTTPS on lubatud menüüs Seaded > Süsteem > Võrk',
    'settings.system.firewall.mode.baselineDesc':
      'Avatud ühilduvusprofiil. Tulemüür töötab, kuid sissetulevaid allikaid ei piirata. Kasuta ainult usaldusväärsetes võrkudes.',
    'settings.system.firewall.mode.moderateDesc':
      'Vaikeprofiil. Säilitab režiimi Baas teenused, kuid võtab uusi sissetulevaid ühendusi vastu ainult privaatsetest, link-local või loopback vahemikest. Väljaminev juurdepääs jääb avatuks.',
    'settings.system.firewall.mode.paranoidDesc':
      'Ainult kohalik HTTPS-juurdepääs. Blokeerib SSH, HTTP, veebipõhised uuendused ja muud väljuvad võrgufunktsioonid. Võrguühenduseta uuenduste üleslaadimine ja juba ettevalmistatud paigaldused jäävad kättesaadavaks.',
    'settings.system.firewall.mode.current': 'Praegune',
    'settings.system.firewall.mode.default': 'Vaikimisi',
    'settings.system.firewall.mode.localOnly': 'Ainult kohalik',
    'settings.system.firewall.mode.openTag': 'Sisenev avatud',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS nõutav',
    'settings.system.firewall.mode.outboundOpen': 'Väljuv avatud',
    'settings.system.firewall.mode.outboundLimited': 'Väljuv piiratud',
    'settings.system.firewall.mode.httpsOnly': 'Ainult HTTPS',
    'settings.system.firewall.moderate.apply': 'Lülitu režiimile Mõõdukas',
    'settings.system.firewall.baseline.apply': 'Lülitu režiimile Baas',
    'settings.system.firewall.baseline.confirmTitle': 'Lülituda avatud režiimile Baas?',
    'settings.system.firewall.baseline.confirmDesc':
      'Tulemüüri teenus jääb aktiivseks, kuid kohalike lähtevahemike piirang eemaldatakse. Avalikud lähtevahemikud võivad jõuda NanoKVM-i avatud teenusteni, kui võrk neid marsruudib.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC on tulemüürirežiimides Piiratud ja Paranoiline keelatud',
    'settings.system.firewall.mode.baseline': 'Baas',
    'settings.system.firewall.mode.moderate': 'Mõõdukas',
    'settings.system.firewall.mode.restricted': 'Piiratud',
    'settings.system.firewall.mode.paranoid': 'Paranoiline',
    'settings.system.firewall.restricted.enable': 'Luba Piiratud',
    'settings.system.firewall.restricted.confirmTitle': 'Kas lubada tulemüüri režiim Piiratud?',
    'settings.system.firewall.paranoid.enable': 'Luba Paranoiline',
    'settings.system.firewall.paranoid.confirmTitle': 'Kas lubada tulemüüri režiim Paranoiline?',
    'settings.update.paranoidBlocked': 'Tulemüüri režiim Paranoiline blokeerib online-uuendused',
    'settings.device.hidOnlyDesc':
      'Parandab ühilduvust hostiga, kui hiir või klaviatuur lakkab reageerimast',
    'mouse.hidOnly.desc':
      'Kui hiir või klaviatuur lakkab reageerimast ning HID lähtestamine ei aita, võib tegu olla NanoKVM-i ja hosti ühilduvusprobleemiga.',
    'settings.device.hidOnlyTip':
      'HID-Only režiim lõpetab virtuaalseadmete emuleerimise ja säilitab ainult põhilise HID juhtimise',
    'settings.device.ssh.tip': 'Määra enne selle valiku lubamist kohas Konto > Parool tugev parool',
    'keyboard.shortcut.captureTips':
      'Süsteemitaseme klahvide, näiteks Windowsi klahvi, salvestamiseks on vaja täisekraani luba',
    'image.tips.usb2':
      'Veendu, et virtuaalne ketas on ühendatud kohas Seaded > Seade > Virtuaalne ketas.',
    'image.tips.tf2':
      'Võta TF-kaart NanoKVM-ist välja. FULL versiooni puhul võta enne korpus lahti.',
    'auth.tips.change3': 'Süsteemi root-parool SSH-sisselogimiseks',
    'power.powerShort': 'Toitenupp: lühike vajutus',
    'power.powerLong': 'Toitenupp: pikk vajutus',
    'settings.tailscale.retry': 'Värskenda ja proovi uuesti või paigalda käsitsi.',
    'wifi.success': 'Mine seadme juurde ja kontrolli NanoKVM-i võrgu olekut',
    'wifi.failed': 'Toiming nurjus, proovi uuesti',
    'keyboard.shortcut.enterFullScreen': 'Lülita täisekraanirežiim',
    'keyboard.leaderKey.desc':
      'Möödu brauseri piirangutest ja saada süsteemi kiirklahvid otse kaugmasinale',
    'image.mountDesc':
      'Mõnes süsteemis tuleb enne image ühendamist kaugmasinas virtuaalne ketas eemaldada',
    'image.unmountDesc':
      'Mõnes süsteemis tuleb enne image eemaldamist see kaugmasinas käsitsi väljutada',
    'auth.totp.prompt': 'Sisesta autentimisrakenduse 6-kohaline kood',
    'auth.totp.backupPrompt': 'Sisesta üks oma varukoodidest',
    'auth.setupRecovery': 'Kui see parool kaob, nõuab taastamine SD-kaardi uuesti kirjutamist',
    'download.remoteDisabled': 'ISO kaugallalaadimine on keelatud menüüs Seaded > Välimus',
    'settings.device.usbWakeupDesc': 'Luba klaviatuuri või hiire sündmustel kaughost äratada',
    'settings.device.usbWakeupTip': 'Lülita välja, kui host logib korduvaid USB wakeup teateid',
    'settings.network.tls.tip':
      'Pane tähele: HTTPS kasutamine võib suurendada latentsust, eriti MJPEG videorežiimis',
    'settings.system.time.servers.description':
      'Kasuta avalikke vaikeservereid, kohalikku ruuterit või enda NTP-servereid',
    'settings.systemLog.remote.protocol': 'Praegune BusyBox syslogd kasutab UDP syslogi',
    'settings.systemLog.viewer.truncated': 'Kuvatakse ainult uusimad logiandmed',
    'settings.update.system.rawEnableDesc':
      'Luba verifitseeritud raw boot/rootfs image failide kirjutamine SD-kaardile sellelt ekraanilt',
    'settings.account.totp.description':
      'Nõua lisaks paroolile autentimisrakenduse ajapõhist koodi',
    'settings.account.totp.requireDescription':
      'Kui see on sees, ei saa kaheastmelist autentimist välja lülitada ning konto, millel seda pole, peab selle enne seadme kasutamist seadistama',
    'picoclaw.empty': 'Alustamiseks ava paneel ja käivita ülesanne',
    'picoclaw.agent.defaultDescription': 'Üldvestlus, otsing ja tööruumi abi',
    'picoclaw.agent.kvmDescription': 'Juhi kaugmasinat NanoKVM-i kaudu',
    'picoclaw.install.uninstalled': 'Runtime edukalt eemaldatud',
    'picoclaw.install.uninstallFailed': 'Eemaldamine nurjus',
    'settings.device.swap.tip': 'Selle funktsiooni lubamine võib lühendada SD-kaardi kasutusiga',
    'settings.update.previewTip':
      'Pane tähele, et eelvaateversioonid võivad sisaldada vigu või lõpetamata funktsioone',
    'auth.changePasswordDesc': 'Seadme turvalisuse huvides muuda parool ära',
    'settings.network.dns.manualServersDescription': 'IPv4 ja IPv6 serverid on toetatud',
    'settings.tailscale.stopDesc': 'Logi välja ja keela automaatne käivitus.',
    'terminal.unlockDesc': 'Terminaliseansi alustamiseks sisesta veebikonto parool',
    'terminal.locked': 'Liiga palju katseid. Proovi hiljem uuesti',
    'keyboard.dropdownEnglish': 'Inglise keel',
    'keyboard.dropdownFrench': 'Prantsuse keel',
    'keyboard.dropdownGerman': 'Saksa keel',
    'keyboard.dropdownRussian': 'Vene keel',
    'keyboard.dropdownKorean': 'Korea keel',
    'keyboard.dropdownJapanese': 'Jaapani keel',
    'download.disabled':
      "Image'e ei saa praegu alla laadida ega üles laadida, sest salvestusruum pole kirjutatav. Kui image on ühendatud, ühenda see lahti ja lülita seejärel virtuaalne ketas välja, et salvestusruum oleks taas kirjutatav.",
    'keyboard.localInput': 'Mobiilse klaviatuuri sisend',
    'settings.network.configuration': 'Seadistus',
    'settings.network.dns.servers': 'Serverid',
    'settings.system.firewall.mode.restrictedDesc':
      'Ainult kohalik HTTPS ja SSH ning väljaminev DNS, NTP, syslog ja veebipõhised uuendused. DHCP ja oluline IPv6 liiklus jäävad kättesaadavaks. WebRTC on blokeeritud.',
    'settings.system.firewall.backends': 'Backendid',
    'settings.system.firewall.restricted.confirmDesc':
      'Sissetulev haldusligipääs piiratakse HTTPS-i ja SSH jaoks private IPv4, IPv4 link-local/loopback, IPv6 link-local või IPv6 loopback lähtevahemikega. Avalikud lähtevahemikud pole lubatud. Väljaminev DNS, NTP, kaug-syslog, online-uuendused, DHCP, olemasolevad ühendused ja hädavajalik IPv6 juhtliiklus jäävad kättesaadavaks. WebRTC/ICE UDP ja muu sisse-/väljaminev liiklus blokeeritakse.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Alles jääb ainult HTTPS ligipääs private IPv4, IPv4 link-local/loopback, IPv6 link-local või IPv6 loopback lähtevahemikest. SSH, HTTP, mDNS, NTP, GitHubi allalaadimised ja muu liiklus blokeeritakse, välja arvatud minimaalne DHCP/IPv6 juhtliiklus.',
    'settings.system.sections.systemLog': 'Logimine',
    'settings.systemLog.remote.title': 'Kaugloogimine',
    'settings.systemLog.remote.forward': 'Edasta süsteemilogi',
    'settings.systemLog.remote.description': 'Edasta süsteemiteated kaugserverisse',
    'settings.systemLog.kernel.title': 'Kerneli logimine',
    'settings.systemLog.local.title': 'Süsteemilogi puhver',
    'settings.systemLog.remote.hostDesc': 'Syslog-serveri hostinimi või IPv4-aadress',
    'settings.systemLog.kernel.enabledDesc': 'Salvesta kerneli teated süsteemilogisse',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Minimaalne kiireloomulisus, et kerneli teade konsooli trükitaks',
    'settings.systemLog.local.priorityDesc': 'Minimaalne kiireloomulisus, et teade logitaks',
    'settings.systemLog.local.bufferDesc': 'Logi suurus, mille juures fail pööratakse',
    'settings.systemLog.local.rotationsDesc': 'Säilitatavate pööratud logifailide arv',
    'settings.systemLog.local.compactDesc': 'Jäta igalt realt välja hostinimi ja facility',
    'settings.systemLog.local.stripTimestampsDesc':
      'Eemalda saatja lisatud ajatemplid; syslog lisab omad',
    'settings.systemLog.local.description':
      'Praeguseid logisid hoitakse RAM-is asukohas {{path}}, et vältida SD-kaardi kirjutusi',
    'settings.systemLog.kernel.enabled': 'Edasta kerneli logi',
    'settings.device.swap.size': 'Swapi suurus',
    'settings.device.swap.description': 'Kasuta swap-faili, kui mälu hakkab otsa saama',
    'settings.device.swap.sizeDescription': 'Määra swap-faili suurus',
    'settings.device.sections.connectivity': 'Ühenduvus',
    'settings.device.sections.hostConnection': 'Hostiühendus',
    'settings.device.sections.inputOutput': 'Sisend ja väljund',
    'settings.device.sections.optimizations': 'Optimeerimised',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'OLED-i ajalõpp',
    'settings.device.oled.keepOn': 'Hoia OLED sisselülitatuna',
    'settings.device.oled.keepOnDescription': 'Ära lülita OLED-ekraani kunagi välja',
    'settings.device.sessionLock.title': 'Lukusta seanss, kui ei kasutata'
  },
  fi: {
    'settings.device.diskDesc': 'Liitä SD-kortti etäkoneeseen',
    'screen.transferRunningTitle': 'Levykuvan siirto käynnissä',
    'screen.transferRunningDesc':
      'Videotilan vaihtaminen lataa sivun uudelleen, mikä keskeyttää käynnissä olevan levykuvan lähetyksen tai latauksen.',
    'screen.transferRunningOk': 'Vaihda tila',
    'settings.device.diskTransferRunning':
      'Levykuvan siirto on käynnissä. Odota sen päättymistä, ennen kuin otat virtuaalilevyn käyttöön.',
    'settings.update.previewChannels': 'Ohjaa sekä sovelluksen että järjestelmän esikatselukanavia',
    'settings.update.system.appUpdateRequired':
      'Päivitä sovellus versioon {{version}} ennen tämän järjestelmäpäivityksen asentamista',
    'settings.update.system.requiredAppVersion': 'Vaadittu sovellusversio',
    'settings.device.diskCancelMount':
      'Virtuaalilevyn käyttöönotto peruu liitetyn levykuvan. Jatketaanko?',
    'image.diskOnWarn':
      'Levykuvan liittäminen sammuttaa virtuaalilevyn, joten tietokone ei enää pääse hakemistoon /data. Jatketaanko?',
    'image.diskOffWarn':
      'Virtuaalilevy on pois päältä ja se on otettava käyttöön levykuvan liittämiseksi. Tietokoneen USB-laitteet tunnistetaan uudelleen. Jatketaanko?',
    'download.diskShared': 'Sammuta ensin virtuaalilevy ja käytä sitten levykuvan latausta',
    'download.diskOff': 'Sammuta virtuaalilevy',
    'settings.device.diskLocked':
      'Pois päältä, kun levykuva on liitettynä, ja käyttöönotto peruu liitoksen',
    'screen.webrtcConnectionFailed.title': 'WebRTC-yhteys epäonnistui',
    'screen.webrtcConnectionFailed.description': 'Tarkista verkkoyhteys tai vaihda videotilaa',
    'download.mountedImage':
      'Tämä levykuva on liitettynä. Irrota se ennen samannimisen tiedoston lähettämistä.',
    'download.sha256': 'Valinnainen SHA-256-tarkistussumma',
    'download.sha256Placeholder': 'Anna 64-merkkinen SHA-256-tarkistussumma',
    'download.invalidSHA256': 'SHA-256:n on oltava 64-merkkinen heksadesimaalimerkkijono',
    'download.checksumFailed': 'Lataus epäonnistui: SHA-256-tarkistus epäonnistui',
    'settings.appearance.menuBar.keyboardLedStatus': 'Näppäimistön lukitusilmaisimet',
    'settings.appearance.menuBar.keyboardLedStatusDesc':
      'Näytä etäkoneen Num Lock-, Caps Lock- ja Scroll Lock -tila',
    'settings.keyboardLedStatus.groupLabel': 'Etänäppäimistön lukitusten tila',
    'settings.keyboardLedStatus.on': 'Päällä',
    'settings.keyboardLedStatus.off': 'Pois',
    'settings.keyboardLedStatus.unknown': 'Tuntematon',
    'settings.device.hdmi.idleTimeoutTitle': 'Kaappauksen joutilasaika',
    'settings.device.hdmi.idleTimeoutDescription':
      'Pysäytä HDMI-kaappaus, kun aktiivisia katselijoita ei ole',
    'settings.system.firewall.enableHttpsFirst':
      'Ota HTTPS käyttöön ennen palomuuritilan Rajoitettu tai Paranoidi käyttöönottoa',
    'settings.system.firewall.httpsRequired':
      'Tilat Rajoitettu ja Paranoidi ovat pois käytöstä, kunnes HTTPS otetaan käyttöön kohdassa Asetukset > Järjestelmä > Verkko',
    'settings.system.firewall.mode.baselineDesc':
      'Avoin yhteensopivuusprofiili. Palomuuri on käynnissä, mutta saapuvia lähteitä ei rajoiteta. Käytä vain luotetuissa verkoissa.',
    'settings.system.firewall.mode.moderateDesc':
      'Oletusprofiili. Säilyttää tilan Perus palvelut, mutta hyväksyy uudet saapuvat yhteydet vain yksityisistä, link-local- tai loopback-alueista. Lähtevä liikenne pysyy avoimena.',
    'settings.system.firewall.mode.paranoidDesc':
      'Vain paikallinen HTTPS-yhteys. Estää SSH:n, HTTP:n, verkkopäivitykset ja muut lähtevän liikenteen verkko-ominaisuudet. Offline-päivitysten lähetys ja jo valmisteltu asennus pysyvät käytettävissä.',
    'settings.system.firewall.mode.current': 'Nykyinen',
    'settings.system.firewall.mode.default': 'Oletus',
    'settings.system.firewall.mode.localOnly': 'Vain paikallinen',
    'settings.system.firewall.mode.openTag': 'Saapuva avoin',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS vaaditaan',
    'settings.system.firewall.mode.outboundOpen': 'Lähtevä avoin',
    'settings.system.firewall.mode.outboundLimited': 'Lähtevä rajoitettu',
    'settings.system.firewall.mode.httpsOnly': 'Vain HTTPS',
    'settings.system.firewall.moderate.apply': 'Siirry tilaan Kohtuullinen',
    'settings.system.firewall.baseline.apply': 'Siirry tilaan Perus',
    'settings.system.firewall.baseline.confirmTitle': 'Siirrytäänkö avoimeen tilaan Perus?',
    'settings.system.firewall.baseline.confirmDesc':
      'Palomuuripalvelu pysyy käytössä, mutta vain paikallisiin lähdealueisiin rajoittava sääntö poistuu. Julkiset lähdealueet voivat tavoittaa NanoKVM:n julkaistut palvelut, jos verkko reitittää ne.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC on poistettu käytöstä palomuuritiloissa Rajoitettu ja Paranoidi',
    'settings.system.firewall.mode.baseline': 'Perus',
    'settings.system.firewall.mode.moderate': 'Kohtuullinen',
    'settings.system.firewall.mode.restricted': 'Rajoitettu',
    'settings.system.firewall.mode.paranoid': 'Paranoidi',
    'settings.system.firewall.restricted.enable': 'Ota Rajoitettu käyttöön',
    'settings.system.firewall.restricted.confirmTitle':
      'Otetaanko palomuuritila Rajoitettu käyttöön?',
    'settings.system.firewall.paranoid.enable': 'Ota Paranoidi käyttöön',
    'settings.system.firewall.paranoid.confirmTitle': 'Otetaanko palomuuritila Paranoidi käyttöön?',
    'settings.update.paranoidBlocked': 'Palomuuritila Paranoidi estää verkkopäivitykset',
    'settings.device.hidOnlyDesc':
      'Parantaa yhteensopivuutta isäntälaitteen kanssa, jos hiiri tai näppäimistö lakkaa reagoimasta',
    'mouse.hidOnly.desc':
      'Jos hiiri tai näppäimistö lakkaa reagoimasta eikä HID:n nollaus auta, kyseessä voi olla NanoKVM:n ja isäntälaitteen yhteensopivuusongelma.',
    'settings.device.hidOnlyTip':
      'HID-Only-tila lopettaa virtuaalilaitteiden emuloinnin ja säilyttää vain perus-HID-ohjauksen',
    'settings.device.ssh.tip':
      'Aseta vahva salasana kohdassa Tili > Salasana ennen tämän asetuksen käyttöönottoa',
    'keyboard.shortcut.captureTips':
      'Järjestelmätason näppäinten, kuten Windows-näppäimen, tallennus vaatii koko näytön luvan',
    'image.tips.usb2':
      'Varmista, että virtuaalilevy on liitetty kohdassa Asetukset > Laite > Virtuaalilevy.',
    'image.tips.tf2': 'Ota TF-kortti NanoKVM:stä. FULL-versiossa pura ensin kotelo.',
    'auth.tips.change3': 'Järjestelmän root-salasana SSH-kirjautumiseen',
    'power.powerShort': 'Virtapainike: lyhyt painallus',
    'power.powerLong': 'Virtapainike: pitkä painallus',
    'settings.tailscale.retry': 'Päivitä ja yritä uudelleen tai asenna käsin.',
    'wifi.success': 'Tarkista NanoKVM:n verkon tila laitteen luona',
    'wifi.failed': 'Toiminto epäonnistui, yritä uudelleen',
    'keyboard.shortcut.enterFullScreen': 'Vaihda koko näytön tilaa',
    'keyboard.leaderKey.desc':
      'Ohita selaimen rajoitukset ja lähetä järjestelmän pikanäppäimet suoraan etäkoneelle',
    'image.mountDesc':
      'Joissakin järjestelmissä virtuaalilevy on poistettava etäkoneesta ennen levykuvan liittämistä',
    'image.unmountDesc':
      'Joissakin järjestelmissä levykuva on poistettava etäkoneesta käsin ennen irrottamista',
    'auth.totp.prompt': 'Anna todennussovelluksen 6-numeroinen koodi',
    'auth.totp.backupPrompt': 'Anna yksi varakoodeistasi',
    'auth.setupRecovery':
      'Jos tämä salasana katoaa, palautus vaatii SD-kortin kirjoittamisen uudelleen',
    'download.remoteDisabled': 'ISO-etälataus on poistettu käytöstä kohdassa Asetukset > Ulkoasu',
    'settings.device.usbWakeupDesc': 'Salli näppäimistön tai hiiren tapahtumien herättää etäisäntä',
    'settings.device.usbWakeupTip':
      'Poista käytöstä, jos isäntä kirjaa toistuvia USB wakeup -viestejä',
    'settings.network.tls.tip': 'Huomaa: HTTPS voi lisätä viivettä, erityisesti MJPEG-videotilassa',
    'settings.system.time.servers.description':
      'Käytä julkisia oletuspalvelimia, paikallista reititintä tai omia NTP-palvelimia',
    'settings.systemLog.remote.protocol': 'Nykyinen BusyBox syslogd käyttää UDP syslogia',
    'settings.systemLog.viewer.truncated': 'Vain uusimmat lokitiedot näytetään',
    'settings.update.system.rawEnableDesc':
      'Salli varmistettujen raw boot/rootfs -imagejen kirjoittaminen SD-kortille tästä näkymästä',
    'settings.account.totp.description':
      'Vaadi salasanan lisäksi todennussovelluksen aikaperusteinen koodi',
    'settings.account.totp.requireDescription':
      'Kun tämä on päällä, kaksivaiheista tunnistautumista ei voi poistaa käytöstä, ja tilin, jolla sitä ei ole, on otettava se käyttöön ennen laitteen käyttöä',
    'picoclaw.empty': 'Avaa paneeli ja käynnistä tehtävä aloittaaksesi',
    'picoclaw.agent.defaultDescription': 'Yleinen keskustelu, haku ja työtilan apu',
    'picoclaw.agent.kvmDescription': 'Ohjaa etäkonetta NanoKVM:n kautta',
    'picoclaw.install.uninstalled': 'Runtime poistettu onnistuneesti',
    'picoclaw.install.uninstallFailed': 'Poisto epäonnistui',
    'settings.device.swap.tip': 'Tämän ominaisuuden käyttö voi lyhentää SD-kortin käyttöikää',
    'settings.update.previewTip':
      'Huomaa, että esikatseluversiot voivat sisältää virheitä tai keskeneräisiä toimintoja',
    'auth.changePasswordDesc': 'Vaihda salasana laitteen turvallisuuden vuoksi',
    'settings.network.dns.manualServersDescription': 'IPv4- ja IPv6-palvelimet ovat tuettuja',
    'settings.tailscale.stopDesc': 'Kirjaudu ulos ja poista automaattinen käynnistys.',
    'terminal.unlockDesc': 'Anna verkkotilin salasana käynnistääksesi terminaali-istunnon',
    'terminal.locked': 'Liikaa yrityksiä. Yritä myöhemmin uudelleen',
    'keyboard.dropdownKorean': 'Korea',
    'keyboard.dropdownJapanese': 'Japani',
    'download.disabled':
      'Levykuvia ei voi nyt ladata eikä lähettää, koska tallennustila ei ole kirjoitettavissa. Jos levykuva on liitetty, irrota se ja kytke sitten virtuaalilevy pois päältä, jotta tallennustila on taas kirjoitettavissa.',
    'keyboard.localInput': 'Mobiilinäppäimistön syöte',
    'settings.network.configuration': 'Määritys',
    'settings.network.dns.servers': 'Palvelimet',
    'settings.system.firewall.mode.restrictedDesc':
      'Vain paikallinen HTTPS ja SSH sekä lähtevä DNS, NTP, syslog ja verkkopäivitykset. DHCP ja välttämätön IPv6-liikenne pysyvät käytettävissä. WebRTC on estetty.',
    'settings.system.firewall.backends': 'Backendit',
    'settings.system.firewall.restricted.confirmDesc':
      'Saapuva ylläpitokäyttö rajataan HTTPS:lle ja SSH:lle private IPv4-, IPv4 link-local/loopback-, IPv6 link-local- tai IPv6 loopback-lähdealueisiin. Julkisia lähdealueita ei sallita. Lähtevä DNS, NTP, etä-syslog, verkkopäivitykset, DHCP, muodostetut yhteydet ja välttämätön IPv6-ohjausliikenne pysyvät käytettävissä. WebRTC/ICE UDP ja muu sisään-/ulospäin kulkeva liikenne estetään.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Vain HTTPS-käyttö private IPv4-, IPv4 link-local/loopback-, IPv6 link-local- tai IPv6 loopback-lähdealueilta jää käyttöön. SSH, HTTP, mDNS, NTP, GitHub-lataukset ja muu liikenne estetään lukuun ottamatta vähäistä DHCP/IPv6-ohjausliikennettä.',
    'settings.system.sections.systemLog': 'Lokitus',
    'settings.systemLog.remote.title': 'Etälokitus',
    'settings.systemLog.remote.forward': 'Välitä järjestelmäloki',
    'settings.systemLog.remote.description': 'Välitä järjestelmäviestit etäpalvelimelle',
    'settings.systemLog.kernel.title': 'Kernel-lokitus',
    'settings.systemLog.local.title': 'Järjestelmälokin puskuri',
    'settings.systemLog.remote.hostDesc': 'Syslog-palvelimen isäntänimi tai IPv4-osoite',
    'settings.systemLog.kernel.enabledDesc': 'Tallenna kernel-viestit järjestelmälokiin',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Pienin kiireellisyys, jolla kernel-viesti tulostetaan konsoliin',
    'settings.systemLog.local.priorityDesc': 'Pienin kiireellisyys, jolla viesti kirjataan lokiin',
    'settings.systemLog.local.bufferDesc': 'Lokin koko, jossa tiedosto kierrätetään',
    'settings.systemLog.local.rotationsDesc': 'Säilytettävien kierrätettyjen lokitiedostojen määrä',
    'settings.systemLog.local.compactDesc': 'Jätä isäntänimi ja facility pois jokaiselta riviltä',
    'settings.systemLog.local.stripTimestampsDesc':
      'Poista lähettäjän lisäämät aikaleimat; syslog lisää omansa',
    'settings.systemLog.local.description':
      'Nykyiset lokit säilytetään RAMissa polussa {{path}}, jotta SD-kortille ei kirjoiteta',
    'settings.systemLog.kernel.enabled': 'Välitä kernel-loki',
    'settings.device.swap.size': 'Swapin koko',
    'settings.device.swap.description': 'Käytä swap-tiedostoa, kun muisti on vähissä',
    'settings.device.swap.sizeDescription': 'Aseta swap-tiedoston koko',
    'settings.device.sections.connectivity': 'Yhteydet',
    'settings.device.sections.hostConnection': 'Isäntäyhteys',
    'settings.device.sections.inputOutput': 'Syöte ja tuloste',
    'settings.device.sections.optimizations': 'Optimoinnit',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'OLEDin aikakatkaisu',
    'settings.device.oled.keepOn': 'Pidä OLED päällä',
    'settings.device.oled.keepOnDescription': 'Älä sammuta OLED-näyttöä koskaan',
    'settings.device.sessionLock.title': 'Lukitse istunto, kun ei käytössä'
  },
  fr: {
    'auth.illegalPassword':
      'Le mot de passe doit contenir au moins 8 caractères et ne peut pas contenir de guillemets ni de barres obliques',
    'screen.videoDirectTips':
      'Activez HTTPS dans « Paramètres > Système > Réseau » pour utiliser ce mode',
    'download.disabled':
      "Les images ne peuvent pas être téléchargées ni téléversées pour le moment, car le stockage n'est pas accessible en écriture. Si une image est montée, démontez-la, puis désactivez le disque virtuel pour que le stockage redevienne accessible en écriture.",
    'auth.ok': 'OK',
    'power.title': 'Alimentation',
    'power.power': 'Alimentation',
    'power.powerShort': "Bouton d'alimentation : appui court",
    'power.powerLong': "Bouton d'alimentation : appui long",
    'power.powerConfirm': "Procéder à l'opération d'alimentation ?",
    'settings.tailscale.run': 'Démarrer',
    'settings.tailscale.enable': 'Activer Tailscale',
    'mouse.grab': 'Curseur de saisie',
    'settings.about.title': 'À propos de NanoKVM',
    'settings.tailscale.upTailscale': 'Téléverser tailscale dans le répertoire NanoKVM /usr/bin/',
    'settings.device.mouseJiggler.title': 'Mouse Jiggler',
    'settings.device.diskDesc': "Monter la carte SD sur l'hôte distant",
    'settings.device.diskCancelMount':
      "Activer le disque virtuel annule l'image montée. Continuer ?",
    'screen.transferRunningTitle': "Transfert d'image en cours",
    'screen.transferRunningDesc':
      "Changer le mode vidéo recharge la page, ce qui annule le téléversement ou le téléchargement d'image en cours.",
    'screen.transferRunningOk': 'Changer de mode',
    'settings.device.diskTransferRunning':
      "Un transfert d'image est en cours. Attendez qu'il se termine avant d'activer le disque virtuel.",
    'settings.update.previewChannels':
      "Contrôle à la fois les canaux d'aperçu de l'application et du système",
    'settings.update.system.appUpdateRequired':
      "Mettez l'application à jour vers {{version}} avant d'installer cette mise à jour système",
    'settings.update.system.requiredAppVersion': "Version d'application requise",
    'settings.system.firewall.enableHttpsFirst':
      "Activez HTTPS avant d'activer le mode pare-feu Restreint ou Paranoïaque",
    'settings.system.firewall.httpsRequired':
      "Les modes Restreint et Paranoïaque sont désactivés tant que HTTPS n'est pas activé dans Paramètres > Système > Réseau",
    'settings.system.firewall.mode.baselineDesc':
      'Profil ouvert de compatibilité. Le pare-feu fonctionne, mais les sources entrantes ne sont pas restreintes. À utiliser uniquement sur des réseaux de confiance.',
    'settings.system.firewall.mode.moderateDesc':
      "Profil par défaut. Conserve les services de Base, mais n'accepte de nouvelles connexions entrantes que depuis des plages privées, link-local ou loopback. L'accès sortant reste ouvert.",
    'settings.system.firewall.mode.paranoidDesc':
      'Accès HTTPS local uniquement. Bloque SSH, HTTP, les mises à jour en ligne et les autres fonctions réseau sortantes. Le téléversement de mises à jour hors ligne et les installations déjà préparées restent disponibles.',
    'settings.system.firewall.mode.current': 'Actuel',
    'settings.system.firewall.mode.default': 'Par défaut',
    'settings.system.firewall.mode.localOnly': 'Local uniquement',
    'settings.system.firewall.mode.openTag': 'Entrant ouvert',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS requis',
    'settings.system.firewall.mode.outboundOpen': 'Sortant ouvert',
    'settings.system.firewall.mode.outboundLimited': 'Sortant limité',
    'settings.system.firewall.mode.httpsOnly': 'HTTPS uniquement',
    'settings.system.firewall.moderate.apply': 'Passer à Modéré',
    'settings.system.firewall.baseline.apply': 'Passer à Base',
    'settings.system.firewall.baseline.confirmTitle': 'Passer au mode Base ouvert ?',
    'settings.system.firewall.baseline.confirmDesc':
      'Le service de pare-feu reste actif, mais la restriction aux plages sources locales est supprimée. Des plages sources publiques peuvent atteindre les services exposés de NanoKVM si le réseau les route.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC est désactivé dans les modes de pare-feu Restreint et Paranoïaque',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Modéré',
    'settings.system.firewall.mode.restricted': 'Restreint',
    'settings.system.firewall.mode.paranoid': 'Paranoïaque',
    'settings.system.firewall.restricted.enable': 'Activer Restreint',
    'settings.system.firewall.restricted.confirmTitle': 'Activer le mode Restreint?',
    'settings.system.firewall.paranoid.enable': 'Activer Paranoïaque',
    'settings.system.firewall.paranoid.confirmTitle': 'Activer le mode Paranoïaque?',
    'settings.update.paranoidBlocked':
      'Les mises à jour en ligne sont bloquées par le mode pare-feu Paranoïaque',
    'settings.device.hidOnlyDesc':
      'Améliore la compatibilité avec l’hôte si la souris ou le clavier ne répondent plus',
    'mouse.hidOnly.desc':
      'Si la souris ou le clavier ne répondent plus et que la réinitialisation du HID n’y change rien, il peut s’agir d’un problème de compatibilité entre le NanoKVM et l’hôte.',
    'settings.device.hidOnlyTip':
      'Le mode HID-Only cesse d’émuler les périphériques virtuels et ne conserve que le contrôle HID de base',
    'settings.device.ssh.tip':
      "Définissez un mot de passe fort dans Compte > Mot de passe avant d'activer cette option",
    'keyboard.shortcut.captureTips':
      'La capture de touches système, comme la touche Windows, nécessite l’autorisation du plein écran',
    'settings.device.diskLocked':
      "Désactivé tant qu'une image est montée, et l'activer annule le montage",
    'image.tips.usb2':
      'Assurez-vous que le disque virtuel est monté dans Paramètres > Appareil > Disque virtuel.',
    'image.tips.tf2':
      "Retirez la carte TF du NanoKVM. Sur la version FULL, il faut d'abord ouvrir le boîtier.",
    'auth.tips.change3': 'Mot de passe racine du système pour la connexion SSH',
    'download.sha256': 'Somme de contrôle SHA-256 facultative',
    'settings.tailscale.notInstall': "Tailscale non trouvé. Veuillez l'installer.",
    'settings.tailscale.retry': 'Veuillez rafraîchir et réessayer, ou installez manuellement.',
    'wifi.success':
      'Veuillez vérifier le statut du réseau du NanoKVM et visitez la nouvelle adresse IP',
    'wifi.failed': "L'opération a échoué, veuillez réessayer",
    'screen.webrtcConnectionFailed.description':
      'Vérifiez la connexion réseau ou changez de mode vidéo',
    'keyboard.shortcut.enterFullScreen': 'Basculer en mode plein écran',
    'keyboard.leaderKey.desc':
      "Contournez les restrictions du navigateur et envoyez les raccourcis système directement à l'hôte distant",
    'image.mountDesc':
      "Dans certains systèmes, il est nécessaire de déséjecter le disque virtuel sur l'hôte distant avant de monter l'image",
    'image.unmountDesc':
      "Sur certains systèmes, vous devez l'éjecter manuellement de l'hôte distant avant de démonter l'image",
    'auth.totp.prompt': 'Saisissez le code à 6 chiffres de votre application d’authentification',
    'auth.totp.backupPrompt': 'Saisissez l’un de vos codes de secours',
    'auth.setupRecovery':
      'Si ce mot de passe est perdu, la récupération nécessite de réécrire la carte SD',
    'download.diskShared':
      "Désactivez d'abord le disque virtuel, puis utilisez le téléchargement d'images",
    'download.remoteDisabled':
      'Le téléchargement ISO distant est désactivé dans Paramètres > Apparence',
    'settings.device.usbWakeupDesc': 'Autorise le clavier ou la souris à réveiller l’hôte distant',
    'settings.device.usbWakeupTip':
      'Désactivez si l’hôte journalise des messages USB wakeup répétés',
    'settings.network.tls.tip':
      "Attention : l'utilisation de HTTPS peut augmenter la latence, surtout en mode vidéo MJPEG",
    'settings.system.time.servers.description':
      'Utiliser les serveurs publics par défaut, votre routeur local ou des serveurs NTP personnalisés',
    'settings.systemLog.remote.protocol': 'Le syslog UDP est utilisé par le syslogd BusyBox actuel',
    'settings.systemLog.viewer.truncated':
      'Seules les données de journal les plus récentes sont affichées',
    'settings.update.system.rawEnableDesc':
      'Autorise l’écriture d’images raw boot/rootfs vérifiées sur la carte SD depuis cet écran',
    'settings.account.totp.description':
      'Exiger un code temporel d’une application d’authentification en plus du mot de passe',
    'settings.account.totp.requireDescription':
      'Tant que cette option est activée, l’authentification à deux facteurs ne peut pas être désactivée, et un compte qui n’en dispose pas doit la configurer avant d’utiliser l’appareil',
    'picoclaw.empty': 'Ouvrez le panneau et démarrez une tâche pour commencer',
    'picoclaw.agent.defaultDescription':
      "Aide générale sur le chat, la recherche et l'espace de travail",
    'picoclaw.agent.kvmDescription': "Faites fonctionner l'hôte distant via NanoKVM",
    'picoclaw.install.uninstalled': 'Runtime désinstallé avec succès',
    'picoclaw.install.uninstallFailed': 'Échec de la désinstallation',
    'settings.device.swap.tip':
      "L'activation de cette fonctionnalité pourrait réduire la durée de vie de votre carte SD",
    'settings.update.previewTip':
      'Veuillez noter que les versions préliminaires peuvent contenir des bugs ou des fonctionnalités incomplètes',
    'auth.changePasswordDesc':
      'Pour la sécurité de votre appareil, veuillez modifier le mot de passe de connexion Web',
    'settings.network.dns.manualServersDescription':
      'Les serveurs IPv4 et IPv6 sont pris en charge',
    'settings.tailscale.stopDesc': 'Déconnecter et désactiver le démarrage automatique.',
    'image.mountFailed': "Échec du montage de l'image",
    'image.tips.tf1': 'Cette méthode est adaptée aux systèmes Linux',
    'terminal.unlockDesc':
      'Saisissez le mot de passe du compte web pour démarrer une session terminal',
    'terminal.locked': 'Trop de tentatives. Réessayez plus tard',
    'settings.update.queryFailed': 'Impossible de vérifier les mises à jour. Veuillez réessayer',
    'screen.frameDetectTip':
      "Calcule la différence entre les images. Arrête la transmission du flux vidéo lorsqu'aucun changement n'est détecté sur l'écran de l'hôte distant.",
    'image.loading': 'Chargement...',
    'keyboard.dropdownKorean': 'Coréen',
    'keyboard.dropdownJapanese': 'Japonais',
    'keyboard.localInput': 'Saisie au clavier mobile',
    'settings.network.configuration': 'Configuration',
    'settings.network.dns.servers': 'Serveurs',
    'settings.system.firewall.mode.restrictedDesc':
      'HTTPS et SSH locaux uniquement, plus DNS, NTP, syslog et mises à jour en ligne sortants. Le DHCP et le trafic IPv6 essentiel restent disponibles. WebRTC est bloqué.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'L’accès administrateur entrant sera limité aux plages private IPv4, IPv4 link-local/loopback, IPv6 link-local ou IPv6 loopback pour HTTPS et SSH. Les plages publiques ne sont pas autorisées. DNS, NTP, syslog distant, mises à jour en ligne, DHCP, connexions établies et trafic de contrôle IPv6 essentiel sortants restent disponibles. WebRTC/ICE UDP et les autres trafics entrants/sortants seront bloqués.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Seul l’accès HTTPS depuis les plages private IPv4, IPv4 link-local/loopback, IPv6 link-local ou IPv6 loopback restera disponible. SSH, HTTP, mDNS, NTP, téléchargements GitHub et le reste du trafic seront bloqués sauf le minimum DHCP/contrôle IPv6.',
    'settings.system.sections.systemLog': 'Journalisation',
    'settings.systemLog.remote.title': 'Journalisation distante',
    'settings.systemLog.remote.forward': 'Transférer le journal système',
    'settings.systemLog.remote.description':
      'Transférer les messages système vers un serveur distant',
    'settings.systemLog.kernel.title': 'Journalisation du noyau',
    'settings.systemLog.local.title': 'Tampon du journal système',
    'settings.systemLog.remote.hostDesc': "Nom d'hôte ou adresse IPv4 du serveur syslog",
    'settings.systemLog.kernel.enabledDesc':
      'Enregistrer les messages du noyau dans le journal système',
    'settings.systemLog.kernel.consoleLevelDesc':
      "Urgence minimale pour qu'un message du noyau soit affiché sur la console",
    'settings.systemLog.local.priorityDesc': "Urgence minimale pour qu'un message soit enregistré",
    'settings.systemLog.local.bufferDesc':
      "Taille du journal à laquelle le fichier fait l'objet d'une rotation",
    'settings.systemLog.local.rotationsDesc': 'Nombre de fichiers de journal archivés à conserver',
    'settings.systemLog.local.compactDesc': "Omettre le nom d'hôte et la facility de chaque ligne",
    'settings.systemLog.local.stripTimestampsDesc':
      "Supprimer les horodatages ajoutés par l'émetteur ; syslog ajoute les siens",
    'settings.systemLog.local.description':
      'Les journaux actuels sont conservés en RAM dans {{path}} pour éviter les écritures sur la carte SD',
    'settings.systemLog.kernel.enabled': 'Transférer le journal du noyau',
    'settings.device.swap.size': "Taille du fichier d'échange",
    'settings.device.swap.description': "Utiliser un fichier d'échange quand la mémoire manque",
    'settings.device.swap.sizeDescription': "Définir la taille du fichier d'échange",
    'settings.device.sections.connectivity': 'Connectivité',
    'settings.device.sections.hostConnection': "Connexion à l'hôte",
    'settings.device.sections.inputOutput': 'Entrée et sortie',
    'settings.device.sections.optimizations': 'Optimisations',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': "Délai de l'OLED",
    'settings.device.oled.keepOn': "Garder l'OLED allumé",
    'settings.device.oled.keepOnDescription': "Ne jamais éteindre l'écran OLED",
    'settings.device.sessionLock.title': "Verrouiller la session en cas d'inactivité"
  },
  hu: {
    'auth.illegalPassword':
      'A jelszónak legalább 8 karakter hosszúnak kell lennie, és nem tartalmazhat idézőjelet vagy törtvonalat',
    'screen.videoDirectTips':
      'Ennek a módnak a használatához engedélyezze a HTTPS-t a „Beállítások > Rendszer > Hálózat” menüpontban',
    'download.disabled':
      'A képfájlok jelenleg nem tölthetők le és nem tölthetők fel, mert a tároló nem írható. Ha egy képfájl csatlakoztatva van, válassza le, majd kapcsolja ki a virtuális lemezt, hogy a tároló újra írható legyen.',
    'keyboard.shortcut.clear': 'Törlés',
    'keyboard.shortcut.title': 'Billentyűparancsok',
    'image.mountMode': 'Csatolási mód',
    'settings.tailscale.uninstall': 'Tailscale eltávolítása',
    'power.powerConfirm': 'Folytatja a tápellátási műveletet?',
    'settings.network.dns.router': 'Útválasztó',
    'settings.network.ipv6.router': 'Útválasztó',
    'settings.network.ipv6.invalidManual': 'Adjon meg érvényes IPv6-címet, előtagot és útválasztót',
    'settings.system.time.invalidServers': 'Adjon meg legalább egy NTP-szervert',
    'settings.systemLog.invalidHost': 'Adjon meg egy syslog-szerver hostot',
    'settings.device.oled.description': 'OLED kijelző kikapcsolása ennyi idő után',
    'screen.transferRunningTitle': 'Képfájl-átvitel folyamatban',
    'screen.transferRunningDesc':
      'A videómód módosítása újratölti az oldalt, ami megszakítja a folyamatban lévő képfájl-feltöltést vagy -letöltést.',
    'screen.transferRunningOk': 'Mód módosítása',
    'settings.device.diskTransferRunning':
      'Képfájl-átvitel van folyamatban. Várja meg, amíg befejeződik, mielőtt engedélyezi a virtuális lemezt.',
    'settings.update.previewChannels':
      'Az alkalmazás és a rendszer előnézeti csatornáit is vezérli',
    'settings.update.system.appUpdateRequired':
      'Az alkalmazást frissítse {{version}} verzióra a rendszerfrissítés telepítése előtt',
    'settings.update.system.requiredAppVersion': 'Szükséges alkalmazásverzió',
    'settings.device.diskDesc': 'SD-kártya csatlakoztatása a távoli gazdagéphez',
    'settings.device.diskCancelMount':
      'A virtuális lemez engedélyezése megszakítja a csatlakoztatott képfájlt. Folytatja?',
    'image.diskOnWarn':
      'A képfájl csatlakoztatása kikapcsolja a virtuális lemezt, így a számítógép többé nem fér hozzá a /data könyvtárhoz. Folytatja?',
    'image.diskOffWarn':
      'A virtuális lemez ki van kapcsolva, és a képfájl csatlakoztatásához engedélyezni kell. A számítógép USB-eszközei újra felismerésre kerülnek. Folytatja?',
    'download.diskShared':
      'Először kapcsolja ki a virtuális lemezt, majd használja a képfájl-letöltést',
    'download.diskOff': 'Virtuális lemez kikapcsolása',
    'settings.device.diskLocked':
      'Kikapcsolva, amíg egy képfájl csatlakoztatva van, és a bekapcsolása megszakítja a csatlakoztatást',
    'settings.tailscale.memory.tip':
      'Ha a memóriahasználat meghaladja a korlátot, a szemétgyűjtés agresszívebben fut, hogy memóriát szabadítson fel. A módosítás érvénybe lépéséhez újra kell indítani a Tailscale-t.',
    'settings.tailscale.restart': 'Újraindítja a Tailscale-t?',
    'settings.tailscale.stop': 'Leállítja a Tailscale-t?',
    'settings.tailscale.stopDesc': 'Kijelentkezés és az automatikus indítás kikapcsolása.',
    'settings.tailscale.okBtn': 'Igen',
    'settings.tailscale.cancelBtn': 'Nem',
    'wifi.success': 'Menjen az eszközhöz, és ellenőrizze a NanoKVM hálózati állapotát',
    'settings.system.firewall.enableHttpsFirst':
      'A Korlátozott vagy Paranoid tűzfalmód engedélyezése előtt engedélyezze a HTTPS-t',
    'settings.system.firewall.httpsRequired':
      'A Korlátozott és Paranoid mód le van tiltva, amíg a HTTPS nincs engedélyezve a Beállítások > Rendszer > Hálózat alatt',
    'settings.system.firewall.mode.baselineDesc':
      'Nyitott kompatibilitási profil. A tűzfal fut, de a bejövő forrásokat nem korlátozza. Csak megbízható hálózatokon használja.',
    'settings.system.firewall.mode.moderateDesc':
      'Alapértelmezett profil. Megtartja az Alap szolgáltatásait, de új bejövő kapcsolatokat csak privát, link-local vagy loopback tartományokból fogad el. A kimenő hozzáférés nyitva marad.',
    'settings.system.firewall.mode.paranoidDesc':
      'Csak helyi HTTPS-hozzáférés. Blokkolja az SSH-t, a HTTP-t, az online frissítéseket és a többi kimenő hálózati funkciót. Az offline frissítések feltöltése és az már előkészített telepítések elérhetők maradnak.',
    'settings.system.firewall.mode.current': 'Jelenlegi',
    'settings.system.firewall.mode.default': 'Alapértelmezett',
    'settings.system.firewall.mode.localOnly': 'Csak helyi',
    'settings.system.firewall.mode.openTag': 'Bejövő nyitott',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS szükséges',
    'settings.system.firewall.mode.outboundOpen': 'Kimenő nyitott',
    'settings.system.firewall.mode.outboundLimited': 'Kimenő korlátozott',
    'settings.system.firewall.mode.httpsOnly': 'Csak HTTPS',
    'settings.system.firewall.moderate.apply': 'Váltás Mérsékelt módra',
    'settings.system.firewall.baseline.apply': 'Váltás Alap módra',
    'settings.system.firewall.baseline.confirmTitle': 'Átvált a nyitott Alap módra?',
    'settings.system.firewall.baseline.confirmDesc':
      'A tűzfalszolgáltatás aktív marad, de megszűnik a csak helyi forrástartományokra vonatkozó korlátozás. A nyilvános forrástartományok elérhetik a NanoKVM nyilvános szolgáltatásait, ha a hálózat továbbítja őket.',
    'screen.videoWebrtcBlockedByFirewall':
      'A H.264 WebRTC le van tiltva Korlátozott és Paranoid tűzfal módban',
    'settings.system.firewall.mode.baseline': 'Alap',
    'settings.system.firewall.mode.moderate': 'Mérsékelt',
    'settings.system.firewall.mode.restricted': 'Korlátozott',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Korlátozott engedélyezése',
    'settings.system.firewall.restricted.confirmTitle': 'Engedélyezi a Korlátozott módot?',
    'settings.system.firewall.paranoid.enable': 'Paranoid engedélyezése',
    'settings.system.firewall.paranoid.confirmTitle': 'Engedélyezi a Paranoid módot?',
    'settings.update.paranoidBlocked': 'Az online frissítéseket a Paranoid tűzfalmód blokkolja',
    'settings.device.hidOnlyDesc':
      'Javítja a gazdagéppel való kompatibilitást, ha az egér vagy a billentyűzet nem válaszol',
    'mouse.hidOnly.desc':
      'Ha az egér vagy a billentyűzet nem válaszol, és a HID alaphelyzetbe állítása nem segít, a NanoKVM és a gazdagép közötti kompatibilitási probléma állhat fenn.',
    'settings.device.hidOnlyTip':
      'A HID-Only mód leállítja a virtuális eszközök emulálását, és csak az alapvető HID vezérlést tartja meg',
    'settings.device.ssh.tip':
      'Az opció engedélyezése előtt állítson be erős jelszót itt: Fiók > Jelszó',
    'keyboard.shortcut.captureTips':
      'A rendszerszintű billentyűk, például a Windows billentyű rögzítéséhez teljes képernyős engedély szükséges',
    'image.tips.usb2':
      'Győződjön meg róla, hogy a virtuális lemez csatlakoztatva van itt: Beállítások > Eszköz > Virtuális lemez.',
    'image.tips.tf2':
      'Vegye ki a TF kártyát a NanoKVM-ből. A FULL verziónál először szedje szét a házat.',
    'auth.tips.change3': 'Rendszer root jelszava az SSH-bejelentkezéshez',
    'download.sha256': 'Opcionális SHA-256 ellenőrzőösszeg',
    'power.powerShort': 'Bekapcsológomb: rövid kattintás',
    'power.powerLong': 'Bekapcsológomb: hosszú kattintás',
    'settings.tailscale.notInstall': 'Tailscale nem található. Kérem, telepítse.',
    'settings.tailscale.retry':
      'Frissítse az oldalt, majd próbálja újra, vagy telepítse manuálisan.',
    'wifi.failed': 'A művelet sikertelen, próbálja újra',
    'screen.webrtcConnectionFailed.description':
      'Ellenőrizze a hálózati kapcsolatot, vagy váltson videómódot',
    'keyboard.shortcut.enterFullScreen': 'Teljes képernyős mód váltása',
    'keyboard.leaderKey.desc':
      'Kerülje ki a böngésző korlátozásait, és küldje el a rendszer parancsikonjait közvetlenül a távoli gazdagépnek',
    'image.mountDesc':
      'Egyes rendszerekben szükséges lehet a virtuális lemez eltávolítása a távoli gépen, mielőtt a képet csatlakoztatja',
    'image.unmountDesc':
      'Egyes rendszereken manuálisan kell kiadnia a távoli gazdagépről a kép leválasztása előtt',
    'auth.totp.prompt': 'Adja meg a hitelesítő alkalmazás 6 számjegyű kódját',
    'auth.totp.backupPrompt': 'Adja meg az egyik tartalék kódját',
    'auth.setupRecovery':
      'Ha ez a jelszó elveszik, a helyreállításhoz újra kell írni az SD-kártyát',
    'download.remoteDisabled':
      'A távoli ISO-letöltés le van tiltva a Beállítások > Megjelenés alatt',
    'settings.device.usbWakeupDesc':
      'Engedje, hogy a billentyűzet vagy egér eseményei felébresszék a távoli gépet',
    'settings.device.usbWakeupTip': 'Kapcsolja ki, ha a gép ismétlődő USB wakeup üzeneteket naplóz',
    'settings.network.tls.tip':
      'Figyelem: A HTTPS használata növelheti a késleltetést, különösen MJPEG videó módban',
    'settings.system.time.servers.description':
      'Használja az alapértelmezett nyilvános szervereket, a helyi routert vagy egyéni NTP-szervereket',
    'settings.systemLog.remote.protocol': 'A jelenlegi BusyBox syslogd UDP syslogot használ',
    'settings.systemLog.viewer.truncated': 'Csak a legfrissebb naplóadatok láthatók',
    'settings.update.system.rawEnableDesc':
      'Engedélyezi ellenőrzött raw boot/rootfs image-ek írását az SD-kártyára erről a képernyőről',
    'settings.account.totp.description':
      'A jelszó mellett időalapú kód megkövetelése egy hitelesítő alkalmazásból',
    'settings.account.totp.requireDescription':
      'Bekapcsolt állapotban a kétfaktoros hitelesítés nem kapcsolható ki, és az a fiók, amelynek nincs, az eszköz használata előtt köteles beállítani',
    'picoclaw.empty': 'Nyissa meg a panelt, és indítsa el a feladatot',
    'picoclaw.agent.defaultDescription': 'Általános csevegési, keresési és munkaterületi súgó',
    'picoclaw.agent.kvmDescription': 'Működtesse a távoli gazdagépet az NanoKVM segítségével',
    'picoclaw.install.uninstalled': 'A Runtime sikeresen eltávolítva',
    'picoclaw.install.uninstallFailed': 'Az eltávolítás nem sikerült',
    'settings.device.swap.tip':
      'Ennek a funkciónak az engedélyezése lerövidítheti az SD-kártya élettartamát',
    'settings.update.previewTip':
      'Kérjük, vegye figyelembe, hogy az előzetes verziók hibákat vagy hiányos funkciókat tartalmazhatnak',
    'auth.changePasswordDesc':
      'Az eszköz biztonsága érdekében módosítsa a webes bejelentkezési jelszót',
    'settings.network.dns.manualServersDescription': 'Az IPv4- és IPv6-kiszolgálók is támogatottak',
    'terminal.unlockDesc': 'Terminálmunkamenet indításához adja meg a webes fiók jelszavát',
    'terminal.locked': 'Túl sok próbálkozás. Próbálja újra később',
    'keyboard.dropdownEnglish': 'Angol',
    'keyboard.dropdownFrench': 'Francia',
    'keyboard.dropdownGerman': 'Német',
    'keyboard.dropdownRussian': 'Orosz',
    'keyboard.dropdownKorean': 'Koreai',
    'keyboard.dropdownJapanese': 'Japán',
    'keyboard.localInput': 'Mobil billentyűzet bemenete',
    'settings.network.configuration': 'Konfiguráció',
    'settings.network.dns.servers': 'Kiszolgálók',
    'settings.system.firewall.mode.restrictedDesc':
      'Csak helyi HTTPS és SSH, valamint kimenő DNS, NTP, syslog és online frissítések. A DHCP és a lényeges IPv6-forgalom elérhető marad. A WebRTC le van tiltva.',
    'settings.system.firewall.backends': 'Backendek',
    'settings.system.firewall.restricted.confirmDesc':
      'A bejövő adminisztrációs hozzáférés HTTPS és SSH esetén private IPv4, IPv4 link-local/loopback, IPv6 link-local vagy IPv6 loopback forrástartományokra korlátozódik. Nyilvános forrástartományok nem engedélyezettek. A kimenő DNS, NTP, távoli syslog, online frissítések, DHCP, meglévő kapcsolatok és alapvető IPv6 vezérlőforgalom elérhető marad. A WebRTC/ICE UDP és minden más bejövő/kimenő forgalom blokkolva lesz.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Csak a HTTPS-hozzáférés marad elérhető private IPv4, IPv4 link-local/loopback, IPv6 link-local vagy IPv6 loopback forrástartományokból. Az SSH, HTTP, mDNS, NTP, GitHub-letöltések és más forgalom blokkolva lesz, kivéve a minimális DHCP/IPv6 vezérlést.',
    'settings.system.sections.systemLog': 'Naplózás',
    'settings.systemLog.remote.title': 'Távoli naplózás',
    'settings.systemLog.remote.forward': 'Rendszernapló továbbítása',
    'settings.systemLog.remote.description': 'A rendszerüzenetek továbbítása távoli szerverre',
    'settings.systemLog.kernel.title': 'Kernel-naplózás',
    'settings.systemLog.local.title': 'Rendszernapló-puffer',
    'settings.systemLog.remote.hostDesc': 'A syslog szerver állomásneve vagy IPv4-címe',
    'settings.systemLog.kernel.enabledDesc': 'A kernelüzenetek rögzítése a rendszernaplóban',
    'settings.systemLog.kernel.consoleLevelDesc':
      'A kernelüzenet konzolra írásához szükséges minimális sürgősség',
    'settings.systemLog.local.priorityDesc': 'Az üzenet naplózásához szükséges minimális sürgősség',
    'settings.systemLog.local.bufferDesc': 'A naplófájl mérete, amelynél a fájl rotálásra kerül',
    'settings.systemLog.local.rotationsDesc': 'A megőrzött rotált naplófájlok száma',
    'settings.systemLog.local.compactDesc': 'Az állomásnév és a facility elhagyása minden sorból',
    'settings.systemLog.local.stripTimestampsDesc':
      'A küldő által hozzáadott időbélyegek eltávolítása; a syslog sajátot ad hozzá',
    'settings.systemLog.local.description':
      'Az aktuális naplók RAM-ban, a {{path}} útvonalon maradnak, hogy elkerülje az SD-kártya írását',
    'settings.systemLog.kernel.enabled': 'Kernelnapló továbbítása',
    'settings.device.swap.size': 'Swap mérete',
    'settings.device.swap.description': 'Swap fájl használata, ha fogy a memória',
    'settings.device.swap.sizeDescription': 'Állítsa be a swap fájl méretét',
    'settings.device.sections.connectivity': 'Kapcsolatok',
    'settings.device.sections.hostConnection': 'Gazdagép-kapcsolat',
    'settings.device.sections.inputOutput': 'Bemenet és kimenet',
    'settings.device.sections.optimizations': 'Optimalizálás',
    'settings.device.minutes': 'perc',
    'settings.device.oled.title': 'OLED időkorlátja',
    'settings.device.oled.keepOn': 'OLED bekapcsolva tartása',
    'settings.device.oled.keepOnDescription': 'Az OLED képernyő sosem kapcsol ki',
    'settings.device.sessionLock.title': 'Munkamenet zárolása inaktivitáskor'
  },
  id: {
    'auth.illegalPassword':
      'Kata sandi harus minimal 8 karakter dan tidak boleh berisi tanda kutip atau garis miring',
    'screen.videoDirectTips':
      'Aktifkan HTTPS di "Pengaturan > Sistem > Jaringan" untuk menggunakan mode ini',
    'download.disabled':
      'Image tidak dapat diunduh atau diunggah saat ini karena penyimpanan tidak dapat ditulisi. Jika ada image yang terpasang, lepaskan, lalu matikan disk virtual agar penyimpanan dapat ditulisi lagi.',
    'auth.placeholderUsername': 'Silakan masukkan nama pengguna',
    'auth.placeholderPassword': 'Silakan masukkan kata sandi',
    'auth.placeholderPassword2': 'Silakan masukkan kata sandi lagi',
    'auth.noEmptyUsername': 'Nama pengguna tidak boleh kosong',
    'auth.noEmptyPassword': 'Kata sandi tidak boleh kosong',
    'auth.invalidUser': 'Nama pengguna atau kata sandi tidak valid',
    'auth.differentPassword': 'Kata sandi tidak sesuai',
    'auth.illegalUsername': 'Nama pengguna mengandung karakter ilegal',
    'auth.error': 'Terjadi kesalahan tak terduga',
    'mouse.title': 'Mouse',
    'keyboard.shortcut.clear': 'Hapus',
    'keyboard.shortcut.custom': 'Kustom',
    'power.powerShort': 'Tombol daya: tekan sebentar',
    'power.reset': 'Atur ulang',
    'wol.sending': 'Mengirim perintah...',
    'settings.device.oled.description': 'Matikan layar OLED setelah',
    'screen.transferRunningTitle': 'Transfer image sedang berlangsung',
    'screen.transferRunningDesc':
      'Mengubah mode video akan memuat ulang halaman sehingga unggahan atau unduhan image yang sedang berjalan dibatalkan.',
    'screen.transferRunningOk': 'Ubah mode',
    'settings.device.diskTransferRunning':
      'Transfer image sedang berjalan. Tunggu sampai selesai sebelum mengaktifkan disk virtual.',
    'settings.update.previewChannels': 'Mengontrol saluran pratinjau aplikasi sekaligus sistem',
    'settings.update.system.appUpdateRequired':
      'Perbarui aplikasi ke {{version}} sebelum memasang pembaruan sistem ini',
    'settings.update.system.requiredAppVersion': 'Versi aplikasi yang diperlukan',
    'settings.device.diskDesc': 'Pasang kartu SD pada host jarak jauh',
    'settings.device.diskCancelMount':
      'Mengaktifkan disk virtual akan membatalkan image yang terpasang. Lanjutkan?',
    'image.diskOnWarn':
      'Memasang image akan mematikan disk virtual, sehingga komputer tidak lagi dapat mengakses /data. Lanjutkan?',
    'image.diskOffWarn':
      'Disk virtual sedang mati dan harus diaktifkan untuk memasang image. Perangkat USB pada komputer akan dienumerasi ulang. Lanjutkan?',
    'download.diskShared': 'Matikan disk virtual terlebih dahulu, lalu gunakan unduhan image',
    'download.diskOff': 'Matikan disk virtual',
    'settings.device.diskLocked':
      'Mati saat image terpasang, dan mengaktifkannya membatalkan pemasangan',
    'settings.tailscale.memory.tip':
      'Saat penggunaan memori melebihi batas, garbage collection dijalankan lebih agresif untuk membebaskan memori. Tailscale perlu dimulai ulang agar perubahan berlaku.',
    'settings.tailscale.restart': 'Mulai ulang Tailscale?',
    'settings.tailscale.stop': 'Hentikan Tailscale?',
    'settings.tailscale.stopDesc': 'Keluar dan nonaktifkan mulai otomatis.',
    'settings.tailscale.okBtn': 'Ya',
    'settings.tailscale.cancelBtn': 'Tidak',
    'wifi.success': 'Silakan periksa status jaringan NanoKVM langsung pada perangkat',
    'settings.system.firewall.enableHttpsFirst':
      'Aktifkan HTTPS sebelum mengaktifkan mode firewall Terbatas atau Paranoid',
    'settings.system.firewall.httpsRequired':
      'Mode Terbatas dan Paranoid dinonaktifkan sampai HTTPS diaktifkan di Pengaturan > Sistem > Jaringan',
    'settings.system.firewall.mode.baselineDesc':
      'Profil kompatibilitas terbuka. Firewall berjalan, tetapi sumber masuk tidak dibatasi. Gunakan hanya di jaringan tepercaya.',
    'settings.system.firewall.mode.moderateDesc':
      'Profil default. Mempertahankan layanan Dasar, tetapi hanya menerima koneksi masuk baru dari rentang privat, link-local, atau loopback. Akses keluar tetap terbuka.',
    'settings.system.firewall.mode.paranoidDesc':
      'Akses HTTPS khusus lokal. Memblokir SSH, HTTP, pembaruan online, dan fitur jaringan keluar lainnya. Unggah pembaruan offline dan instalasi yang sudah disiapkan tetap tersedia.',
    'settings.system.firewall.mode.current': 'Saat ini',
    'settings.system.firewall.mode.default': 'Default',
    'settings.system.firewall.mode.localOnly': 'Khusus lokal',
    'settings.system.firewall.mode.openTag': 'Masuk terbuka',
    'settings.system.firewall.mode.httpsRequiredTag': 'Perlu HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Keluar terbuka',
    'settings.system.firewall.mode.outboundLimited': 'Keluar terbatas',
    'settings.system.firewall.mode.httpsOnly': 'Hanya HTTPS',
    'settings.system.firewall.moderate.apply': 'Beralih ke Sedang',
    'settings.system.firewall.baseline.apply': 'Beralih ke Dasar',
    'settings.system.firewall.baseline.confirmTitle': 'Beralih ke mode Dasar terbuka?',
    'settings.system.firewall.baseline.confirmDesc':
      'Layanan firewall tetap aktif, tetapi pembatasan rentang sumber khusus lokal dihapus. Rentang sumber publik dapat menjangkau layanan NanoKVM yang terbuka jika jaringan merutekannya.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC dinonaktifkan dalam mode firewall Terbatas dan Paranoid',
    'settings.system.firewall.mode.baseline': 'Dasar',
    'settings.system.firewall.mode.moderate': 'Sedang',
    'settings.system.firewall.mode.restricted': 'Terbatas',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Aktifkan Terbatas',
    'settings.system.firewall.restricted.confirmTitle': 'Aktifkan mode Terbatas?',
    'settings.system.firewall.paranoid.enable': 'Aktifkan Paranoid',
    'settings.system.firewall.paranoid.confirmTitle': 'Aktifkan mode Paranoid?',
    'settings.update.paranoidBlocked': 'Pembaruan online diblokir oleh mode firewall Paranoid',
    'settings.device.hidOnlyDesc':
      'Meningkatkan kompatibilitas dengan host jika mouse atau keyboard berhenti merespons',
    'mouse.hidOnly.desc':
      'Jika mouse atau keyboard berhenti merespons dan mereset HID tidak membantu, mungkin ada masalah kompatibilitas antara NanoKVM dan host.',
    'settings.device.hidOnlyTip':
      'Mode HID-Only berhenti meniru perangkat virtual dan hanya mempertahankan kontrol dasar HID',
    'settings.device.ssh.tip':
      'Tetapkan kata sandi yang kuat di Akun > Kata sandi sebelum mengaktifkan opsi ini',
    'keyboard.shortcut.captureTips':
      'Menangkap tombol tingkat sistem, seperti tombol Windows, memerlukan izin layar penuh',
    'image.tips.usb2':
      'Pastikan disk virtual telah terpasang di Pengaturan > Perangkat > Disk virtual.',
    'image.tips.tf2':
      'Ambil kartu TF dari NanoKVM. Pada versi FULL, bongkar casingnya terlebih dahulu.',
    'auth.tips.change3': 'Kata sandi root sistem untuk login SSH',
    'download.sha256': 'Checksum SHA-256 opsional',
    'power.powerLong': 'Tombol daya: tekan lama',
    'settings.tailscale.notInstall': 'Tailscale tidak ditemukan. Silakan pasang.',
    'settings.tailscale.retry': 'Harap segarkan dan coba lagi, atau instal secara manual.',
    'wifi.failed': 'Operasi gagal, silakan coba lagi',
    'screen.webrtcConnectionFailed.description': 'Periksa koneksi jaringan atau ganti mode video',
    'keyboard.shortcut.enterFullScreen': 'Beralih ke mode layar penuh',
    'keyboard.leaderKey.desc':
      'Lewati batasan browser dan kirim pintasan sistem langsung ke host jarak jauh',
    'image.mountDesc':
      'Di beberapa sistem, perlu mengeluarkan disk virtual pada host jarak jauh sebelum memasang gambar',
    'image.unmountDesc':
      'Pada beberapa sistem, Anda perlu mengeluarkan secara manual dari host jarak jauh sebelum melepas gambar',
    'auth.totp.prompt': 'Masukkan kode 6 digit dari aplikasi autentikator Anda',
    'auth.totp.backupPrompt': 'Masukkan salah satu kode cadangan Anda',
    'auth.setupRecovery':
      'Jika kata sandi ini hilang, pemulihan memerlukan penulisan ulang kartu SD',
    'download.remoteDisabled': 'Unduhan ISO jarak jauh dinonaktifkan di Pengaturan > Tampilan',
    'settings.device.usbWakeupDesc':
      'Izinkan kejadian keyboard atau mouse membangunkan host jarak jauh',
    'settings.device.usbWakeupTip': 'Matikan jika host mencatat pesan USB wakeup berulang',
    'settings.network.tls.tip':
      'Perhatian: Menggunakan HTTPS dapat meningkatkan latensi, terutama pada mode video MJPEG',
    'settings.system.time.servers.description':
      'Gunakan server publik bawaan, router lokal Anda, atau server NTP kustom',
    'settings.systemLog.remote.protocol': 'Syslog UDP digunakan oleh BusyBox syslogd saat ini',
    'settings.systemLog.viewer.truncated': 'Hanya data log terbaru yang ditampilkan',
    'settings.update.system.rawEnableDesc':
      'Izinkan image raw boot/rootfs terverifikasi ditulis ke kartu SD dari layar ini',
    'settings.account.totp.description':
      'Wajibkan kode berbasis waktu dari aplikasi autentikator selain kata sandi',
    'settings.account.totp.requireDescription':
      'Saat aktif, autentikasi dua faktor tidak dapat dinonaktifkan, dan akun yang belum memilikinya harus menyiapkannya sebelum menggunakan perangkat',
    'picoclaw.empty': 'Buka panel dan mulai tugas untuk memulai',
    'picoclaw.agent.defaultDescription': 'Obrolan umum, pencarian, dan bantuan ruang kerja',
    'picoclaw.agent.kvmDescription': 'Operasikan host jarak jauh melalui NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime berhasil di-uninstall',
    'picoclaw.install.uninstallFailed': 'Pencopotan pemasangan gagal',
    'settings.device.swap.tip':
      'Mengaktifkan fitur ini dapat mempersingkat masa pakai kartu SD Anda',
    'settings.update.previewTip':
      'Perlu diketahui bahwa rilis pratinjau mungkin mengandung bug atau fungsi yang tidak lengkap',
    'auth.changePasswordDesc': 'Untuk keamanan perangkat Anda, silakan ubah kata sandi masuk web',
    'settings.network.dns.manualServersDescription': 'Server IPv4 dan IPv6 didukung',
    'terminal.unlockDesc': 'Masukkan kata sandi akun web untuk memulai sesi terminal',
    'terminal.locked': 'Terlalu banyak percobaan. Coba lagi nanti',
    'keyboard.dropdownFrench': 'Bahasa Prancis',
    'keyboard.dropdownGerman': 'Bahasa Jerman',
    'keyboard.dropdownRussian': 'Bahasa Rusia',
    'keyboard.dropdownKorean': 'Bahasa Korea',
    'keyboard.dropdownJapanese': 'Bahasa Jepang',
    'script.delDesc': 'Apakah Anda yakin ingin menghapus data ini?',
    'settings.update.isLatest': 'Anda sudah menggunakan versi terbaru.',
    'settings.update.available': 'Ada pembaruan baru. Apakah Anda mau memperbarui?',
    'keyboard.localInput': 'Input papan ketik seluler',
    'settings.network.configuration': 'Konfigurasi',
    'settings.network.dns.servers': 'Server',
    'settings.system.firewall.mode.restrictedDesc':
      'Hanya HTTPS dan SSH lokal, ditambah DNS, NTP, syslog, dan pembaruan online keluar. DHCP dan lalu lintas IPv6 penting tetap tersedia. WebRTC diblokir.',
    'settings.system.firewall.backends': 'Backend',
    'settings.system.firewall.restricted.confirmDesc':
      'Akses admin masuk akan dibatasi ke rentang private IPv4, IPv4 link-local/loopback, IPv6 link-local, atau IPv6 loopback untuk HTTPS dan SSH. Rentang sumber publik tidak diizinkan. DNS, NTP, syslog jarak jauh, pembaruan online, DHCP, koneksi yang sudah terbentuk, dan lalu lintas kontrol IPv6 penting keluar tetap tersedia. WebRTC/ICE UDP dan lalu lintas masuk/keluar lainnya akan diblokir.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Hanya akses HTTPS dari rentang private IPv4, IPv4 link-local/loopback, IPv6 link-local, atau IPv6 loopback yang tetap tersedia. SSH, HTTP, mDNS, NTP, unduhan GitHub, dan lalu lintas lain diblokir kecuali DHCP/kontrol IPv6 minimal.',
    'settings.system.sections.systemLog': 'Pencatatan log',
    'settings.systemLog.remote.title': 'Pencatatan log jarak jauh',
    'settings.systemLog.remote.forward': 'Teruskan log sistem',
    'settings.systemLog.remote.description': 'Teruskan pesan sistem ke server jarak jauh',
    'settings.systemLog.kernel.title': 'Pencatatan Log Kernel',
    'settings.systemLog.local.title': 'Buffer Log Sistem',
    'settings.systemLog.remote.hostDesc': 'Nama host atau alamat IPv4 server syslog',
    'settings.systemLog.kernel.enabledDesc': 'Tangkap pesan kernel ke dalam log sistem',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Tingkat urgensi minimum agar pesan kernel dicetak ke konsol',
    'settings.systemLog.local.priorityDesc': 'Tingkat urgensi minimum agar pesan dicatat',
    'settings.systemLog.local.bufferDesc': 'Ukuran log saat file dirotasi',
    'settings.systemLog.local.rotationsDesc': 'Jumlah file log hasil rotasi yang disimpan',
    'settings.systemLog.local.compactDesc': 'Hilangkan nama host dan facility dari setiap baris',
    'settings.systemLog.local.stripTimestampsDesc':
      'Hapus stempel waktu dari pengirim; syslog menambahkan miliknya sendiri',
    'settings.systemLog.local.description':
      'Log saat ini disimpan di RAM pada {{path}} untuk menghindari penulisan ke kartu SD',
    'settings.systemLog.kernel.enabled': 'Teruskan log kernel',
    'settings.device.swap.size': 'Ukuran swap',
    'settings.device.swap.description': 'Gunakan file swap saat memori hampir habis',
    'settings.device.swap.sizeDescription': 'Atur ukuran file swap',
    'settings.device.sections.connectivity': 'Konektivitas',
    'settings.device.sections.hostConnection': 'Koneksi host',
    'settings.device.sections.inputOutput': 'Input dan output',
    'settings.device.sections.optimizations': 'Optimasi',
    'settings.device.minutes': 'mnt',
    'settings.device.oled.title': 'Batas waktu OLED',
    'settings.device.oled.keepOn': 'Biarkan OLED menyala',
    'settings.device.oled.keepOnDescription': 'Jangan pernah mematikan layar OLED',
    'settings.device.sessionLock.title': 'Kunci sesi saat tidak aktif'
  },
  it: {
    'auth.illegalPassword':
      'La password deve contenere almeno 8 caratteri e non può contenere virgolette o barre',
    'screen.videoDirectTips':
      'Abilita HTTPS in "Impostazioni > Sistema > Rete" per utilizzare questa modalità',
    'download.disabled':
      "Al momento non è possibile scaricare né caricare immagini perché l'archiviazione non è scrivibile. Se un'immagine è montata, smontala e poi disattiva il disco virtuale per rendere di nuovo scrivibile l'archiviazione.",
    'image.unmountDesc':
      "Su alcuni sistemi è necessario espellere manualmente il disco dall'host remoto prima di smontare l'immagine",
    'settings.device.hdmi.description': "Abilita l'uscita HDMI/monitor",
    'settings.device.ssh.description': "Abilita l'accesso remoto SSH",
    'picoclaw.empty': "Apri il pannello e avvia un'attività per iniziare",
    'settings.tailscale.run': 'Avvia',
    'settings.update.paranoidBlocked':
      'Gli aggiornamenti online sono bloccati dalla modalità firewall Paranoica',
    'image.tips.usb2':
      'Assicurati che il disco virtuale sia montato in Impostazioni > Dispositivo > Disco virtuale.',
    'image.tips.usb3':
      'Apri il disco virtuale sul tuo computer e copia il file immagine nella directory principale del disco.',
    'keyboard.shortcut.capture': 'Fai clic qui per acquisire la scorciatoia',
    'keyboard.leaderKey.desc':
      "Ignora le restrizioni del browser e invia le scorciatoie di sistema direttamente all'host remoto",
    'image.mountFailed': 'Montaggio immagine non riuscito',
    'script.runFailed': 'Esecuzione non riuscita',
    'settings.update.system.healthy': 'In buono stato',
    'settings.tailscale.failed': 'Installazione non riuscita',
    'power.resetConfirm': "Procedere con l'operazione di reimpostazione?",
    'settings.device.oled.description': 'Spegni lo schermo OLED dopo',
    'screen.transferRunningTitle': 'Trasferimento immagine in corso',
    'screen.transferRunningDesc':
      "Cambiare la modalità video ricarica la pagina e annulla il caricamento o il download dell'immagine in corso.",
    'screen.transferRunningOk': 'Cambia modalità',
    'settings.device.diskTransferRunning':
      'Un trasferimento di immagine è in corso. Attendi che termini prima di abilitare il disco virtuale.',
    'settings.update.previewChannels':
      "Controlla sia il canale di anteprima dell'applicazione sia quello del sistema",
    'settings.update.system.appUpdateRequired':
      "Aggiorna l'applicazione alla versione {{version}} prima di installare questo aggiornamento di sistema",
    'settings.update.system.requiredAppVersion': 'Versione applicazione richiesta',
    'settings.device.diskDesc': "Monta la scheda SD sull'host remoto",
    'settings.device.diskCancelMount':
      "Abilitare il disco virtuale annulla l'immagine montata. Continuare?",
    'image.diskOnWarn':
      "Montare l'immagine disattiva il disco virtuale, quindi il computer non potrà più accedere a /data. Continuare?",
    'image.diskOffWarn':
      "Il disco virtuale è disattivato e deve essere abilitato per montare l'immagine. I dispositivi USB sul computer vengono enumerati di nuovo. Continuare?",
    'download.diskShared': 'Disattiva prima il disco virtuale, poi usa il download delle immagini',
    'download.diskOff': 'Disattiva il disco virtuale',
    'settings.device.diskLocked':
      "Disattivato mentre un'immagine è montata, e attivarlo annulla il montaggio",
    'settings.tailscale.memory.tip':
      "Quando l'uso della memoria supera il limite, la garbage collection viene eseguita in modo più aggressivo per liberare memoria. Per applicare la modifica è necessario riavviare Tailscale.",
    'settings.tailscale.restart': 'Riavviare Tailscale?',
    'settings.tailscale.stop': 'Arrestare Tailscale?',
    'settings.tailscale.stopDesc': "Disconnetti e disattiva l'avvio automatico.",
    'settings.tailscale.okBtn': 'Sì',
    'wifi.success': 'Vai al dispositivo per controllare lo stato della rete di NanoKVM',
    'settings.system.firewall.enableHttpsFirst':
      'Abilita HTTPS prima di abilitare la modalità firewall Ristretta o Paranoica',
    'settings.system.firewall.httpsRequired':
      'Le modalità Ristretta e Paranoica sono disattivate finché HTTPS non viene abilitato in Impostazioni > Sistema > Rete',
    'settings.system.firewall.mode.baselineDesc':
      'Profilo aperto di compatibilità. Il firewall è attivo, ma le origini in ingresso non sono limitate. Da usare solo su reti attendibili.',
    'settings.system.firewall.mode.moderateDesc':
      "Profilo predefinito. Mantiene i servizi di Base, ma accetta nuove connessioni in ingresso solo da intervalli privati, link-local o loopback. L'accesso in uscita resta aperto.",
    'settings.system.firewall.mode.paranoidDesc':
      'Accesso HTTPS solo locale. Blocca SSH, HTTP, gli aggiornamenti online e le altre funzioni di rete in uscita. Il caricamento di aggiornamenti offline e le installazioni già preparate restano disponibili.',
    'settings.system.firewall.mode.current': 'Corrente',
    'settings.system.firewall.mode.default': 'Predefinito',
    'settings.system.firewall.mode.localOnly': 'Solo locale',
    'settings.system.firewall.mode.openTag': 'Ingresso aperto',
    'settings.system.firewall.mode.httpsRequiredTag': 'Richiede HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Uscita aperta',
    'settings.system.firewall.mode.outboundLimited': 'Uscita limitata',
    'settings.system.firewall.mode.httpsOnly': 'Solo HTTPS',
    'settings.system.firewall.moderate.apply': 'Passa a Moderata',
    'settings.system.firewall.baseline.apply': 'Passa a Base',
    'settings.system.firewall.baseline.confirmTitle': 'Passare alla modalità Base aperta?',
    'settings.system.firewall.baseline.confirmDesc':
      'Il servizio firewall resta attivo, ma viene rimossa la restrizione ai soli intervalli di origine locali. Gli intervalli di origine pubblici possono raggiungere i servizi esposti di NanoKVM se la rete li instrada.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC è disattivato nelle modalità firewall Ristretta e Paranoica',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Moderata',
    'settings.system.firewall.mode.restricted': 'Ristretta',
    'settings.system.firewall.mode.paranoid': 'Paranoica',
    'settings.system.firewall.restricted.enable': 'Abilita Ristretta',
    'settings.system.firewall.restricted.confirmTitle': 'Abilitare la modalità Ristretta?',
    'settings.system.firewall.paranoid.enable': 'Abilita Paranoica',
    'settings.system.firewall.paranoid.confirmTitle': 'Abilitare la modalità Paranoica?',
    'settings.device.hidOnlyDesc':
      "Migliora la compatibilità con l'host se mouse o tastiera smettono di rispondere",
    'mouse.hidOnly.desc':
      "Se mouse o tastiera smettono di rispondere e il ripristino dell'HID non aiuta, potrebbe trattarsi di un problema di compatibilità tra il NanoKVM e l'host.",
    'settings.device.hidOnlyTip':
      'La modalità HID-Only smette di emulare i dispositivi virtuali, mantenendo solo il controllo di base HID',
    'settings.device.ssh.tip':
      'Imposta una password complessa in Account > Password prima di abilitare questa opzione',
    'keyboard.shortcut.captureTips':
      'La cattura dei tasti di sistema, come il tasto Windows, richiede l’autorizzazione a schermo intero',
    'image.tips.tf2':
      'Recupera la scheda TF dal NanoKVM. Sulla versione FULL, smonta prima il case.',
    'auth.tips.change3': "Password root di sistema per l'accesso SSH",
    'download.sha256': 'Checksum SHA-256 facoltativo',
    'power.powerShort': 'Pulsante di accensione: clic breve',
    'power.powerLong': 'Pulsante di accensione: clic lungo',
    'settings.tailscale.notInstall': 'Tailscale non trovato. Per favore, installalo.',
    'settings.tailscale.retry': 'Riprova aggiornando la pagina o installa manualmente.',
    'wifi.failed': 'Operazione non riuscita, riprova',
    'screen.webrtcConnectionFailed.description':
      'Controlla la connessione di rete o cambia la modalità video',
    'keyboard.shortcut.enterFullScreen': 'Attiva/disattiva la modalità a schermo intero',
    'image.mountDesc':
      "In alcuni sistemi, è necessario espellere il disco virtuale sull'host remoto prima di montare l'immagine",
    'auth.totp.prompt': 'Inserisci il codice a 6 cifre della tua app di autenticazione',
    'auth.totp.backupPrompt': 'Inserisci uno dei tuoi codici di backup',
    'auth.setupRecovery':
      'Se questa password viene persa, il recupero richiede la riscrittura della scheda SD',
    'download.remoteDisabled': 'Il download ISO remoto è disattivato in Impostazioni > Aspetto',
    'settings.device.usbWakeupDesc': 'Consente a tastiera o mouse di riattivare l’host remoto',
    'settings.device.usbWakeupTip': 'Disattiva se l’host registra messaggi USB wakeup ripetuti',
    'settings.network.tls.tip':
      "Attenzione: l'uso di HTTPS può aumentare la latenza, soprattutto in modalità video MJPEG",
    'settings.system.time.servers.description':
      'Usa i server pubblici predefiniti, il router locale o server NTP personalizzati',
    'settings.systemLog.remote.protocol': 'Il syslog UDP è usato dall’attuale BusyBox syslogd',
    'settings.systemLog.viewer.truncated': 'Sono mostrati solo i dati di log più recenti',
    'settings.update.system.rawEnableDesc':
      'Consente di scrivere immagini raw boot/rootfs verificate sulla scheda SD da questa schermata',
    'settings.account.totp.description':
      "Richiedi un codice temporaneo da un'app di autenticazione, oltre alla password",
    'settings.account.totp.requireDescription':
      "Finché è attiva, l'autenticazione a due fattori non può essere disattivata e un account che non la ha deve configurarla prima di usare il dispositivo",
    'picoclaw.agent.defaultDescription': "Chat generale, ricerca e aiuto nell'area di lavoro",
    'picoclaw.agent.kvmDescription': "Gestisci l'host remoto tramite NanoKVM",
    'picoclaw.install.uninstalled': 'Runtime disinstallato correttamente',
    'picoclaw.install.uninstallFailed': 'Disinstallazione non riuscita',
    'settings.device.swap.tip':
      'Abilitare questa funzione potrebbe ridurre la durata utile della tua scheda SD',
    'settings.update.previewTip':
      'Tieni presente che le versioni di anteprima possono contenere bug o funzionalità incomplete',
    'auth.changePasswordDesc':
      'Per la sicurezza del tuo dispositivo, modifica la password di accesso web',
    'settings.network.dns.manualServersDescription': 'Sono supportati server IPv4 e IPv6',
    'terminal.unlockDesc':
      'Inserisci la password dell’account web per avviare una sessione terminale',
    'terminal.locked': 'Troppi tentativi. Riprova più tardi',
    'keyboard.dropdownKorean': 'Coreano',
    'keyboard.dropdownJapanese': 'Giapponese',
    'settings.update.offline.invalidName':
      'Formato nome file non valido. Scarica dalle versioni GitHub.',
    'keyboard.localInput': 'Input da tastiera mobile',
    'settings.network.configuration': 'Configurazione',
    'settings.network.dns.servers': 'Server',
    'settings.system.firewall.mode.restrictedDesc':
      'Solo HTTPS e SSH locali, più DNS, NTP, syslog e aggiornamenti online in uscita. DHCP e il traffico IPv6 essenziale restano disponibili. WebRTC è bloccato.',
    'settings.system.firewall.backends': 'Backend',
    'settings.system.firewall.restricted.confirmDesc':
      'L’accesso amministrativo in ingresso sarà limitato agli intervalli private IPv4, IPv4 link-local/loopback, IPv6 link-local o IPv6 loopback per HTTPS e SSH. Gli intervalli pubblici non sono consentiti. DNS, NTP, syslog remoto, aggiornamenti online, DHCP, connessioni stabilite e traffico essenziale IPv6 in uscita resteranno disponibili. WebRTC/ICE UDP e altro traffico in ingresso/uscita saranno bloccati.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Resterà disponibile solo l’accesso HTTPS da intervalli private IPv4, IPv4 link-local/loopback, IPv6 link-local o IPv6 loopback. SSH, HTTP, mDNS, NTP, download da GitHub e altro traffico saranno bloccati salvo il minimo DHCP/controllo IPv6.',
    'settings.system.sections.systemLog': 'Logging',
    'settings.systemLog.remote.title': 'Logging remoto',
    'settings.systemLog.remote.forward': 'Inoltra il log di sistema',
    'settings.systemLog.remote.description': 'Inoltra i messaggi di sistema a un server remoto',
    'settings.systemLog.kernel.title': 'Logging del kernel',
    'settings.systemLog.local.title': 'Buffer del log di sistema',
    'settings.systemLog.remote.hostDesc': 'Nome host o indirizzo IPv4 del server syslog',
    'settings.systemLog.kernel.enabledDesc': 'Acquisisci i messaggi del kernel nel log di sistema',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Urgenza minima perché un messaggio del kernel venga stampato sulla console',
    'settings.systemLog.local.priorityDesc': 'Urgenza minima perché un messaggio venga registrato',
    'settings.systemLog.local.bufferDesc': 'Dimensione del log alla quale il file viene ruotato',
    'settings.systemLog.local.rotationsDesc': 'Numero di file di log ruotati da conservare',
    'settings.systemLog.local.compactDesc': 'Ometti nome host e facility da ogni riga',
    'settings.systemLog.local.stripTimestampsDesc':
      'Rimuovi i timestamp aggiunti dal mittente; syslog aggiunge i propri',
    'settings.systemLog.local.description':
      'I log correnti sono mantenuti in RAM in {{path}} per evitare scritture sulla scheda SD',
    'settings.systemLog.kernel.enabled': 'Inoltra il log del kernel',
    'settings.device.swap.size': 'Dimensione dello swap',
    'settings.device.swap.description':
      'Usa un file di scambio quando la memoria sta per esaurirsi',
    'settings.device.swap.sizeDescription': 'Imposta la dimensione del file di scambio',
    'settings.device.sections.connectivity': 'Connettività',
    'settings.device.sections.hostConnection': "Connessione all'host",
    'settings.device.sections.inputOutput': 'Input e output',
    'settings.device.sections.optimizations': 'Ottimizzazioni',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'Timeout OLED',
    'settings.device.oled.keepOn': "Mantieni l'OLED acceso",
    'settings.device.oled.keepOnDescription': 'Non spegnere mai lo schermo OLED',
    'settings.device.sessionLock.title': 'Blocca sessione quando inattiva'
  },
  ja: {
    'auth.illegalPassword': 'パスワードは 8 文字以上で、引用符やスラッシュを含めることはできません',
    'screen.videoDirectTips':
      'このモードを使用するには「設定 > システム > ネットワーク」で HTTPS を有効にしてください',
    'download.disabled':
      'ストレージが書き込み不可のため、現在イメージをダウンロードまたはアップロードできません。イメージがマウントされている場合はアンマウントし、仮想ディスクをオフにしてストレージを再び書き込み可能にしてください。',
    'settings.appearance.menuBar.modeOff': 'オフ',
    'settings.device.mouseJiggler.disable': '無効',
    'download.inputfile': 'イメージファイルを入力してください',
    'picoclaw.connection.run.busy': 'ビジー',
    'settings.device.diskDesc': 'リモートホストに SD カードをマウントします',
    'settings.device.diskCancelMount':
      '仮想ディスクを有効にすると、マウント中のイメージは解除されます。続行しますか？',
    'screen.transferRunningTitle': 'イメージ転送中',
    'screen.transferRunningDesc':
      'ビデオモードを変更するとページが再読み込みされ、実行中のイメージのアップロードまたはダウンロードがキャンセルされます。',
    'screen.transferRunningOk': 'モードを変更',
    'settings.device.diskTransferRunning':
      'イメージ転送が実行中です。完了するまで待ってから仮想ディスクを有効にしてください。',
    'settings.update.previewChannels':
      'アプリケーションとシステムの両方のプレビューチャンネルを制御します',
    'settings.update.system.appUpdateRequired':
      'このシステム更新をインストールする前に、アプリケーションを {{version}} に更新してください',
    'settings.update.system.requiredAppVersion': '必要なアプリケーションバージョン',
    'settings.system.firewall.enableHttpsFirst':
      '制限付きまたはパラノイドファイアウォールモードを有効にする前に HTTPS を有効にしてください',
    'settings.system.firewall.httpsRequired':
      'HTTPS が「設定 > システム > ネットワーク」で有効になるまで、制限付きモードとパラノイドモードは無効です',
    'settings.system.firewall.mode.baselineDesc':
      'オープンな互換性プロファイル。ファイアウォールは動作しますが、着信元は制限されません。信頼できるネットワークでのみ使用してください。',
    'settings.system.firewall.mode.moderateDesc':
      '既定のプロファイル。ベースラインのサービスを維持しつつ、新しい着信接続はプライベート、リンクローカル、ループバックの範囲からのみ受け付けます。外向きのアクセスは開放されたままです。',
    'settings.system.firewall.mode.paranoidDesc':
      'ローカル専用の HTTPS アクセス。SSH、HTTP、オンライン更新、その他の送信方向のネットワーク機能をブロックします。オフライン更新のアップロードと準備済みのインストールは引き続き利用できます。',
    'settings.system.firewall.mode.current': '現在',
    'settings.system.firewall.mode.default': '既定',
    'settings.system.firewall.mode.localOnly': 'ローカル専用',
    'settings.system.firewall.mode.openTag': '着信は開放',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS が必要',
    'settings.system.firewall.mode.outboundOpen': '送信は開放',
    'settings.system.firewall.mode.outboundLimited': '送信は制限',
    'settings.system.firewall.mode.httpsOnly': 'HTTPS のみ',
    'settings.system.firewall.moderate.apply': '標準に切り替え',
    'settings.system.firewall.baseline.apply': 'ベースラインに切り替え',
    'settings.system.firewall.baseline.confirmTitle':
      'オープンなベースラインモードに切り替えますか?',
    'settings.system.firewall.baseline.confirmDesc':
      'ファイアウォールサービスは有効のままですが、ローカル専用の送信元範囲の制限が解除されます。ネットワークが経路を提供している場合、公開側の送信元範囲から NanoKVM の公開サービスに到達できる可能性があります。',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC は制限付き/パラノイドファイアウォールモードでは無効です',
    'settings.system.firewall.mode.baseline': 'ベースライン',
    'settings.system.firewall.mode.moderate': '標準',
    'settings.system.firewall.mode.restricted': '制限付き',
    'settings.system.firewall.mode.paranoid': 'パラノイド',
    'settings.system.firewall.restricted.enable': '制限付きを有効化',
    'settings.system.firewall.restricted.confirmTitle': '制限付きモードを有効にしますか?',
    'settings.system.firewall.paranoid.enable': 'パラノイドを有効化',
    'settings.system.firewall.paranoid.confirmTitle': 'パラノイドモードを有効にしますか?',
    'settings.update.paranoidBlocked':
      'オンライン更新はパラノイドファイアウォールモードでブロックされています',
    'settings.device.hidOnlyDesc':
      'マウスやキーボードが反応しなくなった場合に、ホストとの互換性を高めます',
    'mouse.hidOnly.desc':
      'マウスやキーボードが反応しなくなり、HID のリセットでも改善しない場合は、NanoKVM とホストの互換性の問題かもしれません。',
    'settings.device.hidOnlyTip':
      'HID-Only モードでは仮想デバイスのエミュレーションを停止し、基本的な HID 制御のみを維持します',
    'settings.device.ssh.tip':
      'このオプションを有効にする前に、アカウント > パスワード で強力なパスワードを設定してください',
    'keyboard.shortcut.captureTips':
      'Windows キーなどのシステムレベルのキーを取得するには、全画面表示の許可が必要です',
    'settings.device.diskLocked':
      'イメージのマウント中はオフで、オンにするとマウントが解除されます',
    'image.tips.usb2':
      '設定 > デバイス > 仮想ディスク で仮想ディスクがマウントされていることを確認してください。',
    'image.tips.tf2':
      'NanoKVM から TF カードを取り出します。FULL バージョンでは、先にケースを分解してください。',
    'auth.tips.change3': 'SSH ログイン用のシステム root パスワード',
    'download.sha256': '任意の SHA-256 チェックサム',
    'power.powerShort': '電源ボタン：短押し',
    'power.powerLong': '電源ボタン：長押し',
    'settings.tailscale.retry':
      'ページを更新してもう一度お試しいただくか、手動でインストールしてください。',
    'wifi.success': 'NanoKVM のネットワークステータスを確認するにはデバイスにアクセスしてください',
    'wifi.failed': '操作に失敗したため、もう一度お試しください',
    'screen.webrtcConnectionFailed.description':
      'ネットワーク接続を確認するか、ビデオモードを切り替えてください',
    'keyboard.shortcut.enterFullScreen': '全画面モードに切り替えます',
    'keyboard.leaderKey.desc':
      'ブラウザの制限を回避して、システムによってブロックされているショートカットキーをリモートホストに送信します',
    'image.mountDesc':
      '一部のシステムでは、イメージをマウントする前にリモートホストで仮想ディスクをアンマウントする必要があります',
    'image.unmountDesc':
      '一部のシステムでは、イメージをアンマウントする前にリモートホストから手動で取り出す必要があります',
    'auth.totp.prompt': '認証アプリに表示された 6 桁のコードを入力してください',
    'auth.totp.backupPrompt': 'バックアップコードのいずれかを入力してください',
    'auth.setupRecovery': 'このパスワードを失った場合、復旧には SD カードの再書き込みが必要です',
    'download.diskShared':
      '先に仮想ディスクをオフにしてから、イメージのダウンロードを使用してください',
    'download.remoteDisabled': 'リモート ISO ダウンロードは「設定 > 外観」で無効になっています',
    'settings.device.usbWakeupDesc':
      'キーボードまたはマウスのイベントでリモートホストを復帰できるようにします',
    'settings.device.usbWakeupTip':
      'ホストが USB wakeup メッセージを繰り返し記録する場合はオフにしてください',
    'settings.network.tls.tip':
      '注意：HTTPS を使用すると、特に MJPEG ビデオモードで遅延が増加する可能性があります',
    'settings.system.time.servers.description':
      '既定の公開サーバー、ローカルルーター、またはカスタム NTP サーバーを使用します',
    'settings.systemLog.remote.protocol': '現在の BusyBox syslogd は UDP syslog を使用します',
    'settings.systemLog.viewer.truncated': '最新のログデータのみ表示されます',
    'settings.update.system.rawEnableDesc':
      '検証済み raw boot/rootfs イメージをこの画面から SD カードに書き込めるようにします',
    'settings.account.totp.description':
      'パスワードに加えて、認証アプリの時間ベースのコードを要求します',
    'settings.account.totp.requireDescription':
      'オンの間は二要素認証を無効にできず、設定していないアカウントはデバイスを使用する前に設定する必要があります',
    'picoclaw.empty': 'パネルを開いてタスクを開始して開始します',
    'picoclaw.agent.defaultDescription': '一般的なチャット、検索、およびワークスペースのヘルプ',
    'picoclaw.agent.kvmDescription': 'NanoKVM を通じてリモート ホストを操作します',
    'picoclaw.install.uninstalled': 'ランタイムは正常にアンインストールされました',
    'picoclaw.install.uninstallFailed': 'アンインストールに失敗しました',
    'settings.device.swap.tip': 'この機能を有効にすると、SD カードの寿命が短くなる可能性があります',
    'settings.update.previewTip':
      'プレビューアップデートには不安定な部分や不完全な機能が含まれる場合があります',
    'auth.changePasswordDesc': 'デバイスのセキュリティのために、パスワードを変更してください',
    'settings.network.dns.manualServersDescription': 'IPv4 と IPv6 のサーバーに対応しています',
    'settings.tailscale.stopDesc': 'ログアウトして自動起動を無効にします。',
    'auth.noAccount':
      'ユーザー情報の取得に失敗しました。ページを更新してもう一度お試しいただくか、パスワードをリセットしてください',
    'auth.locked': 'ログインが多すぎます。後でもう一度お試しください',
    'auth.globalLocked': 'システムは保護されています。後でもう一度試してください',
    'mouse.hidOnly.tip3': 'モードを切り替えると、NanoKVM は自動的に再起動します',
    'terminal.unlockDesc':
      'ターミナルセッションを開始するには Web アカウントのパスワードを入力してください',
    'terminal.locked': '試行回数が多すぎます。後でもう一度お試しください',
    'settings.network.wifi.apMode':
      'AP モードが有効になりました。QR コードをスキャンして Wi-Fi に接続してください',
    'image.loading': '読み込み中...',
    'keyboard.dropdownKorean': '韓国語',
    'keyboard.dropdownJapanese': '日本語',
    'keyboard.localInput': 'モバイルキーボード入力',
    'settings.network.configuration': '設定',
    'settings.network.dns.servers': 'サーバー',
    'settings.system.firewall.mode.restrictedDesc':
      'ローカルのみの HTTPS と SSH に加え、外向きの DNS、NTP、syslog、オンライン更新を許可します。DHCP と必須の IPv6 トラフィックは引き続き利用できます。WebRTC はブロックされます。',
    'settings.system.firewall.backends': 'バックエンド',
    'settings.system.firewall.restricted.confirmDesc':
      'HTTPS と SSH の受信管理アクセスは private IPv4、IPv4 link-local/loopback、IPv6 link-local、IPv6 loopback の送信元範囲に制限されます。公開送信元範囲は許可されません。外向き DNS、NTP、リモート syslog、オンライン更新、DHCP、確立済み接続、必須 IPv6 制御通信は利用可能なままです。WebRTC/ICE UDP とその他の受信/送信通信はブロックされます。',
    'settings.system.firewall.paranoid.confirmDesc':
      'private IPv4、IPv4 link-local/loopback、IPv6 link-local、IPv6 loopback の送信元範囲からの HTTPS アクセスのみが残ります。SSH、HTTP、mDNS、NTP、GitHub ダウンロード、その他の通信は最小限の DHCP/IPv6 制御通信を除きブロックされます。',
    'settings.system.sections.systemLog': 'ログ記録',
    'settings.systemLog.remote.title': 'リモートログ記録',
    'settings.systemLog.remote.forward': 'システムログを転送',
    'settings.systemLog.remote.description': 'システムメッセージをリモートサーバーへ転送します',
    'settings.systemLog.kernel.title': 'カーネルログ記録',
    'settings.systemLog.local.title': 'システムログバッファ',
    'settings.systemLog.remote.hostDesc': 'syslog サーバーのホスト名または IPv4 アドレス',
    'settings.systemLog.kernel.enabledDesc': 'カーネルメッセージをシステムログに記録します',
    'settings.systemLog.kernel.consoleLevelDesc':
      'カーネルメッセージをコンソールに出力する最小の緊急度',
    'settings.systemLog.local.priorityDesc': 'メッセージを記録する最小の緊急度',
    'settings.systemLog.local.bufferDesc': 'ファイルをローテーションするログサイズ',
    'settings.systemLog.local.rotationsDesc': '保持するローテーション済みログファイルの数',
    'settings.systemLog.local.compactDesc': '各行からホスト名とファシリティを省略します',
    'settings.systemLog.local.stripTimestampsDesc':
      '送信側が付けたタイムスタンプを削除します。syslog が独自のものを付けます',
    'settings.systemLog.local.description':
      'SD カードへの書き込みを避けるため、現在のログは {{path}} の RAM に保持されます',
    'settings.systemLog.kernel.enabled': 'カーネルログを転送',
    'settings.device.swap.size': 'スワップのサイズ',
    'settings.device.swap.description': 'メモリが不足したときにスワップファイルを使用します',
    'settings.device.swap.sizeDescription': 'スワップファイルのサイズを設定する',
    'settings.device.sections.connectivity': '接続',
    'settings.device.sections.hostConnection': 'ホスト接続',
    'settings.device.sections.inputOutput': '入力と出力',
    'settings.device.sections.optimizations': '最適化',
    'settings.device.minutes': '分',
    'settings.device.oled.title': 'OLED のタイムアウト',
    'settings.device.oled.keepOn': 'OLED を常にオンにする',
    'settings.device.oled.keepOnDescription': 'OLED 画面を消灯しません',
    'settings.device.sessionLock.title': '非アクティブ時にセッションをロック'
  },
  ko: {
    'auth.illegalPassword': '비밀번호는 8자 이상이어야 하며 따옴표나 슬래시를 포함할 수 없습니다',
    'screen.videoDirectTips':
      '이 모드를 사용하려면 "설정 > 시스템 > 네트워크"에서 HTTPS를 활성화하세요',
    'download.disabled':
      '저장소에 쓸 수 없어 지금은 이미지를 다운로드하거나 업로드할 수 없습니다. 이미지가 마운트되어 있으면 마운트를 해제한 다음 가상 디스크를 꺼서 저장소를 다시 쓸 수 있게 하세요.',
    'keyboard.shortcut.custom': '사용자 지정',
    'keyboard.shortcut.clear': '지우기',
    'settings.about.application': '애플리케이션 버전',
    'screen.scale': '배율',
    'settings.tailscale.upTailscale': 'tailscale을 NanoKVM의 /usr/bin/ 경로에 업로드하세요',
    'settings.tailscale.upTailscaled': 'tailscaled를 NanoKVM의 /usr/sbin/ 경로에 업로드하세요',
    'auth.setupRecovery': '이 비밀번호를 잃어버리면 복구를 위해 SD 카드를 다시 기록해야 합니다',
    'settings.device.diskDesc': '원격 호스트에 SD 카드를 마운트합니다',
    'settings.device.diskCancelMount':
      '가상 디스크를 활성화하면 마운트된 이미지가 해제됩니다. 계속하시겠습니까?',
    'screen.transferRunningTitle': '이미지 전송 중',
    'screen.transferRunningDesc':
      '비디오 모드를 변경하면 페이지가 다시 로드되어 진행 중인 이미지 업로드 또는 다운로드가 취소됩니다.',
    'screen.transferRunningOk': '모드 변경',
    'settings.device.diskTransferRunning':
      '이미지 전송이 진행 중입니다. 완료될 때까지 기다린 후 가상 디스크를 활성화하세요.',
    'settings.update.previewChannels': '애플리케이션과 시스템의 미리보기 채널을 모두 제어합니다',
    'settings.update.system.appUpdateRequired':
      '이 시스템 업데이트를 설치하기 전에 애플리케이션을 {{version}} 버전으로 업데이트하세요',
    'settings.update.system.requiredAppVersion': '필요한 애플리케이션 버전',
    'settings.system.firewall.enableHttpsFirst':
      '제한 또는 파라노이드 방화벽 모드를 활성화하기 전에 HTTPS를 활성화하세요',
    'settings.system.firewall.httpsRequired':
      '설정 > 시스템 > 네트워크에서 HTTPS를 활성화하기 전까지 제한 및 파라노이드 모드는 비활성화됩니다',
    'settings.system.firewall.mode.baselineDesc':
      '개방형 호환성 프로필입니다. 방화벽은 작동하지만 인바운드 소스를 제한하지 않습니다. 신뢰할 수 있는 네트워크에서만 사용하세요.',
    'settings.system.firewall.mode.moderateDesc':
      '기본 프로필입니다. 베이스라인 서비스를 유지하되, 새 인바운드 연결은 사설, 링크 로컬 또는 루프백 범위에서만 허용합니다. 아웃바운드 접근은 열린 상태로 유지됩니다.',
    'settings.system.firewall.mode.paranoidDesc':
      '로컬 전용 HTTPS 접근입니다. SSH, HTTP, 온라인 업데이트 및 기타 아웃바운드 네트워크 기능을 차단합니다. 오프라인 업데이트 업로드와 이미 준비된 설치는 계속 사용할 수 있습니다.',
    'settings.system.firewall.mode.current': '현재',
    'settings.system.firewall.mode.default': '기본',
    'settings.system.firewall.mode.localOnly': '로컬 전용',
    'settings.system.firewall.mode.openTag': '인바운드 개방',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS 필요',
    'settings.system.firewall.mode.outboundOpen': '아웃바운드 개방',
    'settings.system.firewall.mode.outboundLimited': '아웃바운드 제한',
    'settings.system.firewall.mode.httpsOnly': 'HTTPS만',
    'settings.system.firewall.moderate.apply': '보통으로 전환',
    'settings.system.firewall.baseline.apply': '베이스라인으로 전환',
    'settings.system.firewall.baseline.confirmTitle': '개방형 베이스라인 모드로 전환할까요?',
    'settings.system.firewall.baseline.confirmDesc':
      '방화벽 서비스는 계속 활성화되지만 로컬 전용 소스 범위 제한이 해제됩니다. 네트워크가 라우팅하는 경우 공용 소스 범위에서 노출된 NanoKVM 서비스에 접근할 수 있습니다.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC는 제한 및 파라노이드 방화벽 모드에서 비활성화됩니다',
    'settings.system.firewall.mode.baseline': '베이스라인',
    'settings.system.firewall.mode.moderate': '보통',
    'settings.system.firewall.mode.restricted': '제한',
    'settings.system.firewall.mode.paranoid': '파라노이드',
    'settings.system.firewall.restricted.enable': '제한 활성화',
    'settings.system.firewall.restricted.confirmTitle': '제한 모드를 활성화할까요?',
    'settings.system.firewall.paranoid.enable': '파라노이드 활성화',
    'settings.system.firewall.paranoid.confirmTitle': '파라노이드 모드를 활성화할까요?',
    'settings.update.paranoidBlocked': '온라인 업데이트는 파라노이드 방화벽 모드에서 차단됩니다',
    'settings.device.hidOnlyDesc':
      '마우스나 키보드가 응답하지 않을 때 호스트와의 호환성을 높입니다',
    'mouse.hidOnly.desc':
      '마우스나 키보드가 응답하지 않고 HID를 재설정해도 해결되지 않으면 NanoKVM과 호스트 간의 호환성 문제일 수 있습니다.',
    'settings.device.hidOnlyTip':
      'HID-Only 모드는 가상 장치 에뮬레이션을 중지하고 기본 HID 제어만 유지합니다',
    'settings.device.ssh.tip':
      '이 옵션을 활성화하기 전에 계정 > 비밀번호에서 강력한 비밀번호를 설정하세요',
    'keyboard.shortcut.captureTips':
      'Windows 키와 같은 시스템 수준 키를 캡처하려면 전체 화면 권한이 필요합니다',
    'settings.device.diskLocked': '이미지가 마운트된 동안 꺼짐이며, 켜면 마운트가 해제됩니다',
    'image.tips.usb2': '설정 > 장치 > 가상 디스크에서 가상 디스크가 마운트되었는지 확인하세요.',
    'image.tips.tf2': 'NanoKVM에서 TF 카드를 꺼냅니다. FULL 버전은 먼저 케이스를 분해하세요.',
    'auth.tips.change3': 'SSH 로그인용 시스템 루트 비밀번호',
    'download.sha256': '선택 사항 SHA-256 체크섬',
    'power.powerShort': '전원 버튼: 짧게 누르기',
    'power.powerLong': '전원 버튼: 길게 누르기',
    'settings.tailscale.retry': '새로고침하고 다시 시도하거나, 수동으로 설치하세요.',
    'wifi.success': 'NanoKVM의 네트워크 상태를 확인하고 새 IP 주소로 접속하세요',
    'wifi.failed': '작업에 실패했으니 다시 시도하세요',
    'screen.webrtcConnectionFailed.description':
      '네트워크 연결을 확인하거나 비디오 모드를 전환하세요',
    'keyboard.shortcut.enterFullScreen': '전체 화면 모드를 전환합니다',
    'keyboard.leaderKey.desc':
      '브라우저 제한을 우회하고 시스템 바로가기를 원격 호스트에 직접 보냅니다',
    'image.mountDesc':
      '일부 시스템에서는 이미지를 마운트하기 전에 원격 호스트에서 가상 디스크를 제거해야 합니다',
    'image.unmountDesc':
      '일부 시스템에서는 이미지를 언마운트하기 전에 원격 호스트에서 수동으로 제거하여야 합니다',
    'auth.totp.prompt': '인증 앱의 6자리 코드를 입력하세요',
    'auth.totp.backupPrompt': '백업 코드 중 하나를 입력하세요',
    'download.diskShared': '먼저 가상 디스크를 끈 다음 이미지 다운로드를 사용하세요',
    'download.remoteDisabled': '원격 ISO 다운로드가 설정 > 외형에서 비활성화되어 있습니다',
    'settings.device.usbWakeupDesc':
      '키보드 또는 마우스 이벤트가 원격 호스트를 깨우도록 허용합니다',
    'settings.device.usbWakeupTip': '호스트가 USB wakeup 메시지를 반복해서 기록하면 끄세요',
    'settings.network.tls.tip':
      '주의: HTTPS 사용 시 특히 MJPEG 비디오 모드에서 지연 시간이 증가할 수 있습니다',
    'settings.system.time.servers.description':
      '기본 공용 서버, 로컬 라우터 또는 사용자 지정 NTP 서버를 사용합니다',
    'settings.systemLog.remote.protocol': '현재 BusyBox syslogd는 UDP syslog를 사용합니다',
    'settings.systemLog.viewer.truncated': '최신 로그 데이터만 표시됩니다',
    'settings.update.system.rawEnableDesc':
      '이 화면에서 검증된 raw boot/rootfs 이미지를 SD 카드에 쓸 수 있도록 허용합니다',
    'settings.account.totp.description': '비밀번호 외에 인증 앱의 시간 기반 코드를 요구합니다',
    'settings.account.totp.requireDescription':
      '켜져 있는 동안에는 2단계 인증을 끌 수 없으며, 2단계 인증이 없는 계정은 장치를 사용하기 전에 설정해야 합니다',
    'picoclaw.empty': '패널을 열고 작업을 시작하세요',
    'picoclaw.agent.defaultDescription': '일반 대화, 검색, 작업 공간 지원',
    'picoclaw.agent.kvmDescription': 'NanoKVM을 통한 원격 호스트 제어',
    'picoclaw.install.uninstalled': '런타임 삭제에 성공했습니다',
    'picoclaw.install.uninstallFailed': '삭제에 실패했습니다',
    'settings.device.swap.tip': '이 기능을 활성화하면 SD 카드의 수명이 단축될 수 있습니다',
    'settings.update.previewTip':
      '미리보기 버전에는 버그나 완성되지 않은 기능이 포함될 수 있으니 주의하세요',
    'auth.changePasswordDesc': '보안을 위해 웹 로그인 비밀번호를 변경하세요',
    'settings.network.dns.manualServersDescription': 'IPv4 및 IPv6 서버를 지원합니다',
    'settings.tailscale.stopDesc': '로그아웃하고 자동 시작을 비활성화합니다.',
    'auth.placeholderUsername': '사용자 이름을 입력하세요',
    'auth.placeholderPassword': '비밀번호를 입력하세요',
    'auth.placeholderPassword2': '비밀번호를 다시 입력하세요',
    'auth.noEmptyUsername': '사용자 이름은 비어있을 수 없습니다',
    'auth.noEmptyPassword': '비밀번호는 비어있을 수 없습니다',
    'auth.noAccount':
      '사용자 정보를 불러오는 데 실패했습니다. 페이지를 새로고침하거나 비밀번호를 초기화하세요',
    'auth.invalidUser': '사용자 이름이나 비밀번호가 틀렸습니다',
    'auth.locked': '로그인 횟수가 너무 많습니다. 나중에 다시 시도해 주세요',
    'auth.globalLocked': '시스템이 보호 중입니다. 나중에 다시 시도해 주세요',
    'auth.differentPassword': '비밀번호가 서로 일치하지 않습니다',
    'auth.illegalUsername': '사용자 이름에 사용할 수 없는 문자가 있습니다',
    'keyboard.clipboardReadError': '클립보드를 읽지 못했습니다',
    'image.empty': '아무것도 없습니다',
    'terminal.unlockDesc': '터미널 세션을 시작하려면 웹 계정 암호를 입력하세요',
    'terminal.locked': '시도가 너무 많습니다. 나중에 다시 시도하세요',
    'wol.input': 'MAC주소를 입력하세요',
    'download.input': '원격 이미지 URL을 입력하세요',
    'download.uploadbox': '여기에 파일을 놓거나 클릭하여 선택하세요',
    'settings.device.networkDesc': '원격 호스트에서 가상 네트워크 카드를 마운트합니다',
    'settings.tailscale.urlPeriod': '이 주소는 10분간 유효합니다',
    'error.title': '문제가 발생했습니다',
    'keyboard.dropdownKorean': '한국어',
    'keyboard.dropdownJapanese': '일본어',
    'keyboard.localInput': '모바일 키보드 입력',
    'settings.network.configuration': '구성',
    'settings.network.dns.servers': '서버',
    'settings.system.firewall.mode.restrictedDesc':
      '로컬 전용 HTTPS와 SSH, 그리고 송신 DNS, NTP, syslog 및 온라인 업데이트를 허용합니다. DHCP와 필수 IPv6 트래픽은 계속 사용할 수 있습니다. WebRTC는 차단됩니다.',
    'settings.system.firewall.backends': '백엔드',
    'settings.system.firewall.restricted.confirmDesc':
      'HTTPS와 SSH의 수신 관리자 접근은 private IPv4, IPv4 link-local/loopback, IPv6 link-local 또는 IPv6 loopback 원본 범위로 제한됩니다. 공용 원본 범위는 허용되지 않습니다. 송신 DNS, NTP, 원격 syslog, 온라인 업데이트, DHCP, 기존 연결, 필수 IPv6 제어 트래픽은 계속 사용할 수 있습니다. WebRTC/ICE UDP 및 기타 수신/송신 트래픽은 차단됩니다.',
    'settings.system.firewall.paranoid.confirmDesc':
      'private IPv4, IPv4 link-local/loopback, IPv6 link-local 또는 IPv6 loopback 원본 범위의 HTTPS 접근만 남습니다. SSH, HTTP, mDNS, NTP, GitHub 다운로드 및 기타 트래픽은 최소 DHCP/IPv6 제어 트래픽을 제외하고 차단됩니다.',
    'settings.system.sections.systemLog': '로깅',
    'settings.systemLog.remote.title': '원격 로깅',
    'settings.systemLog.remote.forward': '시스템 로그 전달',
    'settings.systemLog.remote.description': '시스템 메시지를 원격 서버로 전달합니다',
    'settings.systemLog.kernel.title': '커널 로깅',
    'settings.systemLog.local.title': '시스템 로그 버퍼',
    'settings.systemLog.remote.hostDesc': 'syslog 서버의 호스트 이름 또는 IPv4 주소',
    'settings.systemLog.kernel.enabledDesc': '커널 메시지를 시스템 로그에 기록합니다',
    'settings.systemLog.kernel.consoleLevelDesc': '커널 메시지를 콘솔에 출력하기 위한 최소 긴급도',
    'settings.systemLog.local.priorityDesc': '메시지를 기록하기 위한 최소 긴급도',
    'settings.systemLog.local.bufferDesc': '파일을 순환(로테이션)시키는 로그 크기',
    'settings.systemLog.local.rotationsDesc': '보관할 순환된 로그 파일 수',
    'settings.systemLog.local.compactDesc': '각 줄에서 호스트 이름과 facility를 생략합니다',
    'settings.systemLog.local.stripTimestampsDesc':
      '발신자가 추가한 타임스탬프를 제거합니다. syslog가 자체 타임스탬프를 추가합니다',
    'settings.systemLog.local.description':
      'SD 카드 쓰기를 피하기 위해 현재 로그는 {{path}}의 RAM에 보관됩니다',
    'settings.systemLog.kernel.enabled': '커널 로그 전달',
    'settings.device.swap.size': '스왑 크기',
    'settings.device.swap.description': '메모리가 부족할 때 스왑 파일을 사용합니다',
    'settings.device.swap.sizeDescription': '스왑 파일 크기 설정',
    'settings.device.sections.connectivity': '연결',
    'settings.device.sections.hostConnection': '호스트 연결',
    'settings.device.sections.inputOutput': '입력 및 출력',
    'settings.device.sections.optimizations': '최적화',
    'settings.device.minutes': '분',
    'settings.device.oled.title': 'OLED 시간 제한',
    'settings.device.oled.keepOn': 'OLED 계속 켜두기',
    'settings.device.oled.keepOnDescription': 'OLED 화면을 끄지 않습니다',
    'settings.device.sessionLock.title': '비활성 시 세션 잠금'
  },
  nb: {
    'auth.illegalPassword':
      'Passordet må være minst 8 tegn og kan ikke inneholde anførselstegn eller skråstreker',
    'screen.videoDirectTips':
      'Aktiver HTTPS under "Innstillinger > System > Nettverk" for å bruke denne modusen',
    'download.disabled':
      'Bilder kan ikke lastes ned eller lastes opp akkurat nå fordi lagringen ikke er skrivbar. Hvis et bilde er montert, må du avmontere det og deretter slå av den virtuelle disken slik at lagringen blir skrivbar igjen.',
    'settings.about.image': 'Systembildeversjon',
    'keyboard.title': 'Tastatur',
    'keyboard.submit': 'Send',
    'screen.video': 'Videomodus',
    'settings.update.confirm': 'Bekreft',
    'keyboard.dropdownGerman': 'Tysk',
    'keyboard.dropdownRussian': 'Russisk',
    'settings.device.oled.description': 'Slå av OLED-skjermen etter',
    'screen.transferRunningTitle': 'Bildeoverføring pågår',
    'screen.transferRunningDesc':
      'Hvis du bytter videomodus, lastes siden på nytt, og pågående opplasting eller nedlasting av bildet avbrytes.',
    'screen.transferRunningOk': 'Bytt modus',
    'settings.device.diskTransferRunning':
      'En bildeoverføring pågår. Vent til den er ferdig før du aktiverer den virtuelle disken.',
    'settings.update.previewChannels':
      'Styrer både forhåndsvisningskanalene for applikasjonen og systemet',
    'settings.update.system.appUpdateRequired':
      'Oppdater applikasjonen til {{version}} før du installerer denne systemoppdateringen',
    'settings.update.system.requiredAppVersion': 'Påkrevd applikasjonsversjon',
    'settings.device.diskDesc': 'Monter SD-kortet på den eksterne verten',
    'settings.device.diskCancelMount':
      'Hvis du aktiverer den virtuelle disken, avbrytes det monterte bildet. Fortsette?',
    'image.diskOnWarn':
      'Når bildet monteres, slås den virtuelle disken av, slik at datamaskinen ikke lenger får tilgang til /data. Fortsette?',
    'image.diskOffWarn':
      'Den virtuelle disken er av og må aktiveres for å montere bildet. USB-enhetene på datamaskinen registreres på nytt. Fortsette?',
    'download.diskShared': 'Slå først av den virtuelle disken, og bruk deretter bildenedlastingen',
    'download.diskOff': 'Slå av den virtuelle disken',
    'settings.device.diskLocked': 'Av mens et bilde er montert, og aktivering avbryter monteringen',
    'settings.tailscale.memory.tip':
      'Når minnebruken overskrider grensen, kjøres garbage collection mer aggressivt for å frigjøre minne. Tailscale må startes på nytt for at endringen skal tre i kraft.',
    'settings.tailscale.restart': 'Starte Tailscale på nytt?',
    'settings.tailscale.stop': 'Stoppe Tailscale?',
    'settings.tailscale.stopDesc': 'Logg ut og slå av automatisk oppstart.',
    'settings.tailscale.okBtn': 'Ja',
    'settings.tailscale.cancelBtn': 'Nei',
    'wifi.success': 'Gå til enheten og kontroller nettverksstatusen til NanoKVM',
    'settings.system.firewall.enableHttpsFirst':
      'Aktiver HTTPS før du aktiverer brannmurmodusen Begrenset eller Paranoid',
    'settings.system.firewall.httpsRequired':
      'Modusene Begrenset og Paranoid er deaktivert til HTTPS er aktivert under Innstillinger > System > Nettverk',
    'settings.system.firewall.mode.baselineDesc':
      'Åpen kompatibilitetsprofil. Brannmuren kjører, men innkommende kilder er ikke begrenset. Bruk bare på pålitelige nettverk.',
    'settings.system.firewall.mode.moderateDesc':
      'Standardprofil. Beholder Basis-tjenestene, men godtar bare nye innkommende tilkoblinger fra private, link-local- eller loopback-områder. Utgående tilgang forblir åpen.',
    'settings.system.firewall.mode.paranoidDesc':
      'Kun lokal HTTPS-tilgang. Blokkerer SSH, HTTP, nettbaserte oppdateringer og andre utgående nettverksfunksjoner. Opplasting av frakoblede oppdateringer og allerede klargjorte installasjoner er fortsatt tilgjengelig.',
    'settings.system.firewall.mode.current': 'Gjeldende',
    'settings.system.firewall.mode.default': 'Standard',
    'settings.system.firewall.mode.localOnly': 'Kun lokalt',
    'settings.system.firewall.mode.openTag': 'Innkommende åpen',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS kreves',
    'settings.system.firewall.mode.outboundOpen': 'Utgående åpen',
    'settings.system.firewall.mode.outboundLimited': 'Utgående begrenset',
    'settings.system.firewall.mode.httpsOnly': 'Kun HTTPS',
    'settings.system.firewall.moderate.apply': 'Bytt til Moderat',
    'settings.system.firewall.baseline.apply': 'Bytt til Basis',
    'settings.system.firewall.baseline.confirmTitle': 'Bytte til åpen Basis-modus?',
    'settings.system.firewall.baseline.confirmDesc':
      'Brannmurtjenesten forblir aktiv, men begrensningen til lokale kildeområder fjernes. Offentlige kildeområder kan nå eksponerte NanoKVM-tjenester hvis nettverket ruter dem.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC er deaktivert i brannmurmodusene Begrenset og Paranoid',
    'settings.system.firewall.mode.baseline': 'Basis',
    'settings.system.firewall.mode.moderate': 'Moderat',
    'settings.system.firewall.mode.restricted': 'Begrenset',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Aktiver Begrenset',
    'settings.system.firewall.restricted.confirmTitle': 'Aktivere brannmurmodusen Begrenset?',
    'settings.system.firewall.paranoid.enable': 'Aktiver Paranoid',
    'settings.system.firewall.paranoid.confirmTitle': 'Aktivere brannmurmodusen Paranoid?',
    'settings.update.paranoidBlocked': 'Onlineoppdateringer blokkeres av brannmurmodusen Paranoid',
    'settings.device.hidOnlyDesc':
      'Forbedrer kompatibiliteten med verten hvis musen eller tastaturet slutter å svare',
    'mouse.hidOnly.desc':
      'Hvis musen eller tastaturet slutter å svare og det ikke hjelper å tilbakestille HID, kan det være et kompatibilitetsproblem mellom NanoKVM og verten.',
    'settings.device.hidOnlyTip':
      'HID-Only-modus slutter å emulere virtuelle enheter og beholder bare grunnleggende HID-kontroll',
    'settings.device.ssh.tip':
      'Angi et sterkt passord under Konto > Passord før du aktiverer dette alternativet',
    'keyboard.shortcut.captureTips':
      'Registrering av systemtaster, som Windows-tasten, krever fullskjermtillatelse',
    'image.tips.usb2':
      'Sørg for at den virtuelle disken er montert under Innstillinger > Enhet > Virtuell disk.',
    'image.tips.tf2':
      'Ta TF-kortet ut av NanoKVM-enheten. På FULL-versjonen må du demontere kabinettet først.',
    'auth.tips.change3': 'Systemets root-passord for SSH-innlogging',
    'download.sha256': 'Valgfri SHA-256-sjekksum',
    'power.powerShort': 'På-knapp: kort trykk',
    'power.powerLong': 'På-knapp: langt trykk',
    'settings.tailscale.notInstall': 'Tailscale er ikke funnet. Vennligst installer.',
    'settings.tailscale.retry':
      'Vennligst last inn siden på nytt og forsøk igjen, eller installer manuelt.',
    'wifi.failed': 'Operasjonen mislyktes, prøv igjen',
    'screen.webrtcConnectionFailed.description':
      'Kontroller nettverkstilkoblingen eller bytt videomodus',
    'keyboard.shortcut.enterFullScreen': 'Veksle fullskjermmodus',
    'keyboard.leaderKey.desc':
      'Omgå nettleserrestriksjoner og send systemsnarveier direkte til den eksterne verten',
    'image.mountDesc':
      'På noen systemer er det nødvendig å koble fra den virtuelle disken på den eksterne verten før man kan montere arkivfilen',
    'image.unmountDesc':
      'På noen systemer må du manuelt løse ut fra den eksterne verten før du demonterer bildet',
    'auth.totp.prompt': 'Skriv inn den 6-sifrede koden fra autentiseringsappen din',
    'auth.totp.backupPrompt': 'Skriv inn en av reservekodene dine',
    'auth.setupRecovery':
      'Hvis dette passordet mistes, krever gjenoppretting at SD-kortet skrives på nytt',
    'download.remoteDisabled': 'Ekstern ISO-nedlasting er deaktivert i Innstillinger > Utseende',
    'settings.device.usbWakeupDesc':
      'Tillat tastatur- eller musehendelser å vekke den eksterne verten',
    'settings.device.usbWakeupTip': 'Slå av hvis verten logger gjentatte USB wakeup-meldinger',
    'settings.network.tls.tip':
      'Merk: Bruk av HTTPS kan øke forsinkelsen, spesielt i MJPEG-videomodus',
    'settings.system.time.servers.description':
      'Bruk standard offentlige servere, din lokale ruter eller egne NTP-servere',
    'settings.systemLog.remote.protocol': 'UDP-syslog brukes av gjeldende BusyBox syslogd',
    'settings.systemLog.viewer.truncated': 'Bare de nyeste loggdataene vises',
    'settings.update.system.rawEnableDesc':
      'Tillat at verifiserte raw boot/rootfs-images skrives til SD-kortet fra denne skjermen',
    'settings.account.totp.description':
      'Krev en tidsbasert kode fra en autentiseringsapp i tillegg til passordet',
    'settings.account.totp.requireDescription':
      'Mens dette er på, kan ikke tofaktorautentisering deaktiveres, og en konto uten den må sette den opp før enheten kan brukes',
    'picoclaw.empty': 'Åpne panelet og start en oppgave for å begynne',
    'picoclaw.agent.defaultDescription': 'Generell chat-, søk- og arbeidsområdehjelp',
    'picoclaw.agent.kvmDescription': 'Betjen den eksterne verten gjennom NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime ble avinstallert',
    'picoclaw.install.uninstallFailed': 'Avinstallering mislyktes',
    'settings.device.swap.tip':
      'Aktivering av denne funksjonen kan forkorte SD-kortets brukbare levetid',
    'settings.update.previewTip':
      'Vær oppmerksom på at forhåndsvisningsutgivelser kan inneholde feil eller ufullstendig funksjonalitet',
    'auth.changePasswordDesc':
      'For sikkerheten til enheten, vennligst endre passordet ditt for web-innlogging',
    'settings.network.dns.manualServersDescription': 'IPv4- og IPv6-servere støttes',
    'terminal.unlockDesc': 'Skriv inn passordet til webkontoen for å starte en terminaløkt',
    'terminal.locked': 'For mange forsøk. Prøv igjen senere',
    'keyboard.dropdownKorean': 'Koreansk',
    'keyboard.dropdownJapanese': 'Japansk',
    'keyboard.localInput': 'Inndata fra mobiltastatur',
    'settings.network.configuration': 'Konfigurasjon',
    'settings.network.dns.servers': 'Servere',
    'settings.system.firewall.mode.restrictedDesc':
      'Kun lokal HTTPS og SSH, pluss utgående DNS, NTP, syslog og nettbaserte oppdateringer. DHCP og nødvendig IPv6-trafikk forblir tilgjengelig. WebRTC er blokkert.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'Innkommende administratortilgang begrenses til private IPv4-, IPv4 link-local/loopback-, IPv6 link-local- eller IPv6 loopback-kilder for HTTPS og SSH. Offentlige kildeområder er ikke tillatt. Utgående DNS, NTP, ekstern syslog, onlineoppdateringer, DHCP, etablerte forbindelser og nødvendig IPv6-kontrolltrafikk forblir tilgjengelig. WebRTC/ICE UDP og annen inn-/utgående trafikk blokkeres.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Bare HTTPS-tilgang fra private IPv4, IPv4 link-local/loopback, IPv6 link-local eller IPv6 loopback forblir tilgjengelig. SSH, HTTP, mDNS, NTP, GitHub-nedlastinger og annen trafikk blokkeres bortsett fra minimal DHCP/IPv6-kontroll.',
    'settings.system.sections.systemLog': 'Logging',
    'settings.systemLog.remote.title': 'Ekstern logging',
    'settings.systemLog.remote.forward': 'Videresend systemlogg',
    'settings.systemLog.remote.description': 'Videresend systemmeldinger til en ekstern server',
    'settings.systemLog.kernel.title': 'Kjernelogging',
    'settings.systemLog.local.title': 'Systemloggbuffer',
    'settings.systemLog.remote.hostDesc': 'Vertsnavn eller IPv4-adresse til syslog-serveren',
    'settings.systemLog.kernel.enabledDesc': 'Fang opp kjernemeldinger i systemloggen',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Minste hastegrad for at en kjernemelding skrives ut på konsollen',
    'settings.systemLog.local.priorityDesc': 'Minste hastegrad for at en melding logges',
    'settings.systemLog.local.bufferDesc': 'Loggstørrelse der filen roteres',
    'settings.systemLog.local.rotationsDesc': 'Antall roterte loggfiler som beholdes',
    'settings.systemLog.local.compactDesc': 'Utelat vertsnavn og facility fra hver linje',
    'settings.systemLog.local.stripTimestampsDesc':
      'Fjern tidsstempler lagt til av avsenderen; syslog legger til sine egne',
    'settings.systemLog.local.description':
      'Gjeldende logger holdes i RAM på {{path}} for å unngå skriving til SD-kortet',
    'settings.systemLog.kernel.enabled': 'Videresend kjernelogg',
    'settings.device.swap.size': 'Swap-størrelse',
    'settings.device.swap.description': 'Bruk en byttefil når minnet begynner å ta slutt',
    'settings.device.swap.sizeDescription': 'Angi størrelsen på byttefilen',
    'settings.device.sections.connectivity': 'Tilkobling',
    'settings.device.sections.hostConnection': 'Vertstilkobling',
    'settings.device.sections.inputOutput': 'Inndata og utdata',
    'settings.device.sections.optimizations': 'Optimaliseringer',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'OLED-tidsavbrudd',
    'settings.device.oled.keepOn': 'Hold OLED på',
    'settings.device.oled.keepOnDescription': 'Slå aldri av OLED-skjermen',
    'settings.device.sessionLock.title': 'Lås økt ved inaktivitet'
  },
  nl: {
    'auth.illegalPassword':
      'Het wachtwoord moet minstens 8 tekens bevatten en mag geen aanhalingstekens of schuine strepen bevatten',
    'screen.videoDirectTips':
      'Schakel HTTPS in bij "Instellingen > Systeem > Netwerk" om deze modus te gebruiken',
    'download.disabled':
      'Images kunnen nu niet worden gedownload of geüpload omdat de opslag niet beschrijfbaar is. Als er een image is gekoppeld, ontkoppel die dan en schakel daarna de virtuele schijf uit zodat de opslag weer beschrijfbaar wordt.',
    'screen.resetHdmi': 'HDMI resetten',
    'keyboard.shortcut.clear': 'Wissen',
    'keyboard.shortcut.title': 'Sneltoetsen',
    'settings.tailscale.uninstall': 'Tailscale verwijderen',
    'settings.tailscale.run': 'Start',
    'settings.network.wifi.disconnect': 'Weet u zeker dat u de netwerkverbinding wilt verbreken?',
    'settings.device.diskDesc': 'SD-kaart koppelen aan de externe host',
    'settings.device.diskCancelMount':
      'Het inschakelen van de virtuele schijf annuleert de gekoppelde image. Doorgaan?',
    'settings.device.oled.description': 'OLED-scherm uitschakelen na',
    'screen.transferRunningTitle': 'Image-overdracht bezig',
    'screen.transferRunningDesc':
      'Het wijzigen van de videomodus laadt de pagina opnieuw, waardoor de lopende image-upload of -download wordt geannuleerd.',
    'screen.transferRunningOk': 'Modus wijzigen',
    'settings.device.diskTransferRunning':
      'Er loopt een image-overdracht. Wacht tot die klaar is voordat u de virtuele schijf inschakelt.',
    'settings.update.previewChannels':
      'Beheert zowel het previewkanaal van de applicatie als dat van het systeem',
    'settings.update.system.appUpdateRequired':
      'Werk de applicatie bij naar {{version}} voordat u deze systeemupdate installeert',
    'settings.update.system.requiredAppVersion': 'Vereiste applicatieversie',
    'settings.system.firewall.enableHttpsFirst':
      'Schakel HTTPS in voordat u de firewallmodus Beperkt of Paranoïde inschakelt',
    'settings.system.firewall.httpsRequired':
      'De modi Beperkt en Paranoïde zijn uitgeschakeld totdat HTTPS is ingeschakeld bij Instellingen > Systeem > Netwerk',
    'settings.system.firewall.mode.baselineDesc':
      'Open compatibiliteitsprofiel. De firewall draait, maar inkomende bronnen worden niet beperkt. Alleen gebruiken op vertrouwde netwerken.',
    'settings.system.firewall.mode.moderateDesc':
      'Standaardprofiel. Behoudt de Basis-diensten, maar accepteert nieuwe inkomende verbindingen alleen vanuit privé-, link-local- of loopbackbereiken. Uitgaande toegang blijft open.',
    'settings.system.firewall.mode.paranoidDesc':
      'Alleen lokale HTTPS-toegang. Blokkeert SSH, HTTP, online updates en andere uitgaande netwerkfuncties. Het uploaden van offline updates en al klaargezette installaties blijven beschikbaar.',
    'settings.system.firewall.mode.current': 'Huidig',
    'settings.system.firewall.mode.default': 'Standaard',
    'settings.system.firewall.mode.localOnly': 'Alleen lokaal',
    'settings.system.firewall.mode.openTag': 'Inkomend open',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS vereist',
    'settings.system.firewall.mode.outboundOpen': 'Uitgaand open',
    'settings.system.firewall.mode.outboundLimited': 'Uitgaand beperkt',
    'settings.system.firewall.mode.httpsOnly': 'Alleen HTTPS',
    'settings.system.firewall.moderate.apply': 'Overschakelen naar Gematigd',
    'settings.system.firewall.baseline.apply': 'Overschakelen naar Basis',
    'settings.system.firewall.baseline.confirmTitle': 'Overschakelen naar de open modus Basis?',
    'settings.system.firewall.baseline.confirmDesc':
      'De firewalldienst blijft actief, maar de beperking tot lokale bronbereiken vervalt. Openbare bronbereiken kunnen blootgestelde NanoKVM-diensten bereiken als het netwerk ze routeert.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC is uitgeschakeld in de firewallmodi Beperkt en Paranoïde',
    'settings.system.firewall.mode.baseline': 'Basis',
    'settings.system.firewall.mode.moderate': 'Gematigd',
    'settings.system.firewall.mode.restricted': 'Beperkt',
    'settings.system.firewall.mode.paranoid': 'Paranoïde',
    'settings.system.firewall.restricted.enable': 'Beperkt inschakelen',
    'settings.system.firewall.restricted.confirmTitle': 'Firewallmodus Beperkt inschakelen?',
    'settings.system.firewall.paranoid.enable': 'Paranoïde inschakelen',
    'settings.system.firewall.paranoid.confirmTitle': 'Firewallmodus Paranoïde inschakelen?',
    'settings.update.paranoidBlocked':
      'Online-updates worden geblokkeerd door firewallmodus Paranoïde',
    'settings.device.hidOnlyDesc':
      'Verbetert de compatibiliteit met de host als muis of toetsenbord niet meer reageren',
    'mouse.hidOnly.desc':
      'Als muis of toetsenbord niet meer reageren en het resetten van HID niet helpt, kan het gaan om een compatibiliteitsprobleem tussen de NanoKVM en de host.',
    'settings.device.hidOnlyTip':
      'De HID-Only-modus stopt met het emuleren van virtuele apparaten en behoudt alleen de basisbesturing van HID',
    'settings.device.ssh.tip':
      'Stel een sterk wachtwoord in via Account > Wachtwoord voordat u deze optie inschakelt',
    'keyboard.shortcut.captureTips':
      'Voor het vastleggen van systeemtoetsen, zoals de Windows-toets, is toestemming voor volledig scherm vereist',
    'settings.device.diskLocked':
      'Uit zolang een image is gekoppeld, en aanzetten breekt het koppelen af',
    'image.tips.usb2':
      'Zorg ervoor dat de virtuele schijf is gekoppeld in Instellingen > Apparaat > Virtuele schijf.',
    'image.tips.tf2':
      'Haal de TF-kaart uit de NanoKVM. Demonteer bij de FULL-versie eerst de behuizing.',
    'auth.tips.change3': 'Systeem root-wachtwoord voor SSH-inlog',
    'download.sha256': 'Optionele SHA-256-controlesom',
    'power.powerShort': 'Aan/uit-knop: kort indrukken',
    'power.powerLong': 'Aan/uit-knop: lang indrukken',
    'settings.tailscale.notInstall': 'Tailscale niet gevonden. Installeer a.u.b.',
    'settings.tailscale.retry': 'Vernieuw en probeer opnieuw, of installeer handmatig.',
    'wifi.success': 'Controleer de netwerkstatus van NanoKVM en bezoek het nieuwe IP-adres',
    'wifi.failed': 'De bewerking is mislukt, probeer het opnieuw',
    'screen.webrtcConnectionFailed.description':
      'Controleer de netwerkverbinding of wijzig de videomodus',
    'keyboard.shortcut.enterFullScreen': 'Schakelen naar volledig scherm',
    'keyboard.leaderKey.desc':
      'Omzeil browserbeperkingen en stuur systeemsnelkoppelingen rechtstreeks naar de externe host',
    'image.mountDesc':
      'In sommige systemen is het noodzakelijk om de virtuele schijf op de externe host uit te werpen voordat het image wordt gekoppeld',
    'image.unmountDesc':
      'Op sommige systemen moet u de image handmatig uitwerpen van de externe host voordat u de image ontkoppelt',
    'auth.totp.prompt': 'Voer de 6-cijferige code uit uw authenticator-app in',
    'auth.totp.backupPrompt': 'Voer een van uw back-upcodes in',
    'auth.setupRecovery':
      'Als dit wachtwoord verloren gaat, moet de SD-kaart opnieuw worden geschreven voor herstel',
    'download.diskShared':
      'Schakel eerst de virtuele schijf uit en gebruik daarna de image-download',
    'download.remoteDisabled':
      'ISO-download op afstand is uitgeschakeld in Instellingen > Uiterlijk',
    'settings.device.usbWakeupDesc':
      'Sta toetsenbord- of muisgebeurtenissen toe om de externe host te wekken',
    'settings.device.usbWakeupTip': 'Schakel uit als de host herhaald USB wakeup-berichten logt',
    'settings.network.tls.tip':
      'Let op: HTTPS gebruiken kan de latentie verhogen, vooral in MJPEG-videomodus',
    'settings.system.time.servers.description':
      'Gebruik de standaard openbare servers, je lokale router of eigen NTP-servers',
    'settings.systemLog.remote.protocol':
      'UDP-syslog wordt gebruikt door de huidige BusyBox syslogd',
    'settings.systemLog.viewer.truncated': 'Alleen de nieuwste loggegevens worden getoond',
    'settings.update.system.rawEnableDesc':
      'Sta toe dat geverifieerde raw boot/rootfs-images vanaf dit scherm naar de SD-kaart worden geschreven',
    'settings.account.totp.description':
      'Vereis naast uw wachtwoord een tijdgebonden code uit een authenticator-app',
    'settings.account.totp.requireDescription':
      'Zolang dit aan staat, kan tweefactorauthenticatie niet worden uitgeschakeld en moet een account zonder tweefactorauthenticatie die instellen voordat het apparaat wordt gebruikt',
    'picoclaw.empty': 'Open het paneel en start een taak om te beginnen',
    'picoclaw.agent.defaultDescription': 'Algemene hulp bij chatten, zoeken en werkruimte',
    'picoclaw.agent.kvmDescription': 'Bedien de externe host via NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime is succesvol verwijderd',
    'picoclaw.install.uninstallFailed': 'Verwijderen mislukt',
    'settings.device.swap.tip':
      'Het inschakelen van deze functie kan de bruikbare levensduur van uw SD-kaart verkorten',
    'settings.update.previewTip':
      'Houd er rekening mee dat preview-releases bugs of onvolledige functionaliteit kunnen bevatten',
    'auth.changePasswordDesc':
      'Voor de veiligheid van uw apparaat, wijzig alstublieft het webaanmeldingswachtwoord',
    'settings.network.dns.manualServersDescription': 'IPv4- en IPv6-servers worden ondersteund',
    'settings.tailscale.stopDesc': 'Uitloggen en automatisch opstarten uitschakelen.',
    'terminal.unlockDesc':
      'Voer het wachtwoord van uw webaccount in om een terminalsessie te starten',
    'terminal.locked': 'Te veel pogingen. Probeer later opnieuw',
    'keyboard.dropdownKorean': 'Koreaans',
    'keyboard.dropdownJapanese': 'Japans',
    'mouse.hidOnly.tip1':
      'Als u de HID-Only-modus inschakelt, worden de virtuele schijf en het virtuele netwerk ontkoppeld',
    'settings.device.mdns.tip':
      'Maakt het apparaat bereikbaar via zijn .local-naam. Niet nodig als u verbinding maakt via IP-adres of uw DNS de hostnaam al omzet.',
    'settings.account.totp.enableDescription':
      'Bevestig uw wachtwoord om door te gaan. Het is nodig bij elke wijziging van de tweede factor.',
    'settings.account.totp.disableDescription':
      'Uw account wordt dan alleen nog door het wachtwoord beschermd. Bevestig met uw wachtwoord om door te gaan.',
    'settings.account.totp.scan': 'Scan dit met uw authenticator-app.',
    'settings.account.totp.backupTitle': 'Bewaar nu uw back-upcodes',
    'settings.account.totp.backupDescription':
      'Elke code werkt maar één keer en wordt niet opnieuw getoond. Ze zijn de enige weg terug als u uw authenticator-app kwijtraakt, en ze blijven werken als de klok van het apparaat niet is gesynchroniseerd.',
    'settings.account.totp.clockUnsynced':
      'De klok van het apparaat is nog niet gesynchroniseerd. Synchroniseer de tijd via Instellingen > Systeem > Tijd voordat u begint met instellen.',
    'settings.account.totp.regenerateDescription':
      'Uw huidige back-upcodes werken dan niet meer. Bevestig met uw wachtwoord om door te gaan.',
    'settings.account.totp.requiredDescription':
      'Dit apparaat is ingesteld om een tweede factor te vereisen, maar uw account heeft er nog geen ingesteld. Stel die nu in om door te gaan.',
    'keyboard.localInput': 'Invoer via mobiel toetsenbord',
    'settings.network.configuration': 'Configuratie',
    'settings.network.dns.servers': 'Servers',
    'settings.system.firewall.mode.restrictedDesc':
      'Alleen lokale HTTPS en SSH, plus uitgaande DNS, NTP, syslog en online updates. DHCP en essentieel IPv6-verkeer blijven beschikbaar. WebRTC is geblokkeerd.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'Inkomende beheerstoegang wordt voor HTTPS en SSH beperkt tot private IPv4-, IPv4 link-local/loopback-, IPv6 link-local- of IPv6 loopback-bronbereiken. Openbare bronbereiken zijn niet toegestaan. Uitgaande DNS, NTP, externe syslog, online-updates, DHCP, bestaande verbindingen en essentieel IPv6-besturingsverkeer blijven beschikbaar. WebRTC/ICE UDP en ander inkomend/uitgaand verkeer worden geblokkeerd.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Alleen HTTPS-toegang vanuit private IPv4, IPv4 link-local/loopback, IPv6 link-local of IPv6 loopback-bronbereiken blijft beschikbaar. SSH, HTTP, mDNS, NTP, GitHub-downloads en ander verkeer worden geblokkeerd behalve minimaal DHCP/IPv6-controleverkeer.',
    'settings.system.sections.systemLog': 'Logging',
    'settings.systemLog.remote.title': 'Remote logging',
    'settings.systemLog.remote.forward': 'Systeemlog doorsturen',
    'settings.systemLog.remote.description': 'Systeemberichten doorsturen naar een externe server',
    'settings.systemLog.kernel.title': 'Kernel-logging',
    'settings.systemLog.local.title': 'Systeemlogbuffer',
    'settings.systemLog.remote.hostDesc': 'Hostnaam of IPv4-adres van de syslog-server',
    'settings.systemLog.kernel.enabledDesc': 'Kernelberichten vastleggen in de systeemlog',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Minimale urgentie om een kernelbericht op de console af te drukken',
    'settings.systemLog.local.priorityDesc': 'Minimale urgentie om een bericht te loggen',
    'settings.systemLog.local.bufferDesc': 'Loggrootte waarbij het bestand wordt geroteerd',
    'settings.systemLog.local.rotationsDesc': 'Aantal geroteerde logbestanden dat wordt bewaard',
    'settings.systemLog.local.compactDesc': 'Hostnaam en facility weglaten uit elke regel',
    'settings.systemLog.local.stripTimestampsDesc':
      'Door de afzender toegevoegde tijdstempels verwijderen; syslog voegt zijn eigen toe',
    'settings.systemLog.local.description':
      'Huidige logs worden in RAM bewaard op {{path}} om schrijven naar de SD-kaart te vermijden',
    'settings.systemLog.kernel.enabled': 'Kernellog doorsturen',
    'settings.device.swap.size': 'Swap-grootte',
    'settings.device.swap.description': 'Een wisselbestand gebruiken als het geheugen opraakt',
    'settings.device.swap.sizeDescription': 'Stel de grootte van het wisselbestand in',
    'settings.device.sections.connectivity': 'Connectiviteit',
    'settings.device.sections.hostConnection': 'Hostverbinding',
    'settings.device.sections.inputOutput': 'Invoer en uitvoer',
    'settings.device.sections.optimizations': 'Optimalisaties',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'OLED-timeout',
    'settings.device.oled.keepOn': 'OLED aanhouden',
    'settings.device.oled.keepOnDescription': 'Het OLED-scherm nooit uitschakelen',
    'settings.device.sessionLock.title': 'Sessie vergrendelen bij inactiviteit'
  },
  pl: {
    'auth.illegalPassword':
      'Hasło musi mieć co najmniej 8 znaków i nie może zawierać cudzysłowów ani ukośników',
    'screen.videoDirectTips':
      'Włącz HTTPS w „Ustawienia > System > Sieć”, aby korzystać z tego trybu',
    'download.disabled':
      'Obrazy nie mogą być teraz pobierane ani przesyłane, ponieważ pamięć nie jest zapisywalna. Jeśli obraz jest zamontowany, odmontuj go, a następnie wyłącz dysk wirtualny, aby pamięć znów była zapisywalna.',
    'auth.placeholderUsername': 'Wprowadź nazwę użytkownika',
    'auth.placeholderPassword': 'Wprowadź hasło',
    'auth.placeholderPassword2': 'Wprowadź hasło ponownie',
    'auth.noEmptyUsername': 'Nazwa użytkownika nie może być pusta',
    'auth.noEmptyPassword': 'Hasło nie może być puste',
    'auth.invalidUser': 'Błędne hasło lub nazwa użytkownika',
    'auth.differentPassword': 'Hasła nie zgadzają się',
    'auth.illegalUsername': 'Nazwa użytkownika zawiera niedozwolone znaki',
    'auth.error': 'Niespodziewany błąd',
    'keyboard.dropdownGerman': 'Niemiecki',
    'mouse.hide': 'Ukryj kursor',
    'script.runBackground': 'Uruchom w tle',
    'image.deleteConfirm': 'Czy na pewno chcesz usunąć ten obraz?',
    'keyboard.shortcut.clear': 'Wyczyść',
    'power.powerConfirm': 'Wykonać operację zasilania?',
    'settings.device.oled.description': 'Wyłącz ekran OLED po',
    'screen.transferRunningTitle': 'Trwa przesyłanie obrazu',
    'screen.transferRunningDesc':
      'Zmiana trybu wideo przeładowuje stronę, co anuluje trwające przesyłanie lub pobieranie obrazu.',
    'screen.transferRunningOk': 'Zmień tryb',
    'settings.device.diskTransferRunning':
      'Trwa przesyłanie obrazu. Poczekaj na jego zakończenie, zanim włączysz dysk wirtualny.',
    'settings.update.previewChannels': 'Steruje kanałami podglądu zarówno aplikacji, jak i systemu',
    'settings.update.system.appUpdateRequired':
      'Zaktualizuj aplikację do wersji {{version}}, zanim zainstalujesz tę aktualizację systemu',
    'settings.update.system.requiredAppVersion': 'Wymagana wersja aplikacji',
    'settings.device.diskDesc': 'Zamontuj kartę SD na zdalnym hoście',
    'settings.device.diskCancelMount':
      'Włączenie dysku wirtualnego anuluje zamontowany obraz. Kontynuować?',
    'image.diskOnWarn':
      'Zamontowanie obrazu wyłącza dysk wirtualny, więc komputer straci dostęp do /data. Kontynuować?',
    'image.diskOffWarn':
      'Dysk wirtualny jest wyłączony i musi zostać włączony, aby zamontować obraz. Urządzenia USB w komputerze zostaną wyliczone ponownie. Kontynuować?',
    'download.diskShared': 'Najpierw wyłącz dysk wirtualny, a następnie użyj pobierania obrazów',
    'download.diskOff': 'Wyłącz dysk wirtualny',
    'settings.device.diskLocked':
      'Wyłączony, gdy obraz jest zamontowany, a włączenie anuluje zamontowanie',
    'settings.tailscale.memory.tip':
      'Gdy użycie pamięci przekracza limit, garbage collection działa bardziej agresywnie, aby zwolnić pamięć. Aby zmiana zaczęła obowiązywać, trzeba ponownie uruchomić Tailscale.',
    'settings.tailscale.restart': 'Uruchomić ponownie Tailscale?',
    'settings.tailscale.stop': 'Zatrzymać Tailscale?',
    'settings.tailscale.stopDesc': 'Wyloguj i wyłącz automatyczne uruchamianie.',
    'settings.tailscale.okBtn': 'Tak',
    'settings.tailscale.cancelBtn': 'Nie',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC jest wyłączony w trybach zapory Ograniczony i Paranoidalny',
    'settings.system.firewall.enableHttpsFirst':
      'Włącz HTTPS przed włączeniem trybu Ograniczony lub Paranoidalny',
    'settings.system.firewall.httpsRequired':
      'Tryby Ograniczony i Paranoidalny są niedostępne, dopóki HTTPS nie zostanie włączony w Ustawienia > System > Sieć',
    'settings.system.firewall.mode.baseline': 'Podstawowy',
    'settings.system.firewall.mode.moderate': 'Umiarkowany',
    'settings.system.firewall.mode.moderateDesc':
      'Profil domyślny. Zachowuje usługi baseline, ale przyjmuje nowe połączenia przychodzące tylko z zakresów prywatnych, link-local lub loopback. Dostęp wychodzący pozostaje otwarty.',
    'settings.system.firewall.mode.restricted': 'Ograniczony',
    'settings.system.firewall.mode.paranoid': 'Paranoidalny',
    'settings.system.firewall.moderate.apply': 'Przełącz na Umiarkowany',
    'settings.system.firewall.restricted.enable': 'Włącz Ograniczony',
    'settings.system.firewall.restricted.confirmTitle': 'Włączyć tryb zapory Ograniczony?',
    'settings.system.firewall.paranoid.enable': 'Włącz Paranoidalny',
    'settings.system.firewall.paranoid.confirmTitle': 'Włączyć tryb zapory Paranoidalny?',
    'settings.system.firewall.baseline.apply': 'Przełącz na Podstawowy',
    'settings.system.firewall.baseline.confirmTitle': 'Przełączyć na otwarty tryb Podstawowy?',
    'settings.update.paranoidBlocked':
      'Aktualizacje online są blokowane przez tryb zapory Paranoidalny',
    'settings.device.hidOnlyDesc':
      'Poprawia zgodność z hostem, gdy mysz lub klawiatura przestają reagować',
    'mouse.hidOnly.desc':
      'Jeśli mysz lub klawiatura przestaną reagować, a reset HID nie pomaga, może to być problem ze zgodnością między NanoKVM a hostem.',
    'settings.device.hidOnlyTip':
      'Tryb HID-Only przestaje emulować urządzenia wirtualne i zachowuje tylko podstawową kontrolę HID',
    'settings.device.ssh.tip': 'Ustaw silne hasło w Konto > Hasło przed włączeniem tej opcji',
    'keyboard.shortcut.captureTips':
      'Przechwytywanie klawiszy systemowych, takich jak klawisz Windows, wymaga uprawnienia do pełnego ekranu',
    'image.tips.usb2':
      'Upewnij się, że dysk wirtualny jest zamontowany w Ustawienia > Urządzenie > Dysk wirtualny.',
    'image.tips.tf2': 'Wyjmij kartę TF z NanoKVM. W wersji FULL najpierw zdemontuj obudowę.',
    'auth.tips.change3': 'Hasło roota systemu do logowania przez SSH',
    'download.sha256': 'Opcjonalna suma kontrolna SHA-256',
    'power.powerShort': 'Przycisk zasilania: krótkie kliknięcie',
    'power.powerLong': 'Przycisk zasilania: długie kliknięcie',
    'settings.tailscale.notInstall': 'Nie znaleziono Tailscale. Zainstaluj go.',
    'settings.tailscale.retry': 'Odśwież stronę i spróbuj ponownie lub zainstaluj ręcznie.',
    'wifi.success': 'Podejdź do urządzenia, aby sprawdzić stan sieci NanoKVM',
    'wifi.failed': 'Operacja nie powiodła się, spróbuj ponownie',
    'screen.webrtcConnectionFailed.description': 'Sprawdź połączenie sieciowe lub zmień tryb wideo',
    'keyboard.shortcut.enterFullScreen': 'Przełącz tryb pełnoekranowy',
    'keyboard.leaderKey.desc':
      'Omiń ograniczenia przeglądarki i wyślij skróty systemowe bezpośrednio do zdalnego hosta',
    'image.mountDesc':
      'W niektórych systemach wymagane jest wyjęcie dysku wirtualnego na zdalnym hoście przed zamontowaniem obrazu',
    'image.unmountDesc':
      'W niektórych systemach należy ręcznie wysunąć obraz ze zdalnego hosta przed odmontowaniem obrazu',
    'terminal.unlockDesc': 'Wprowadź dane konta web, aby otworzyć powłokę roota',
    'auth.totp.prompt': 'Wpisz 6-cyfrowy kod z aplikacji uwierzytelniającej',
    'auth.totp.backupPrompt': 'Wpisz jeden ze swoich kodów zapasowych',
    'auth.setupRecovery':
      'Jeśli to hasło zostanie utracone, odzyskanie dostępu wymaga ponownego zapisania karty SD',
    'download.remoteDisabled': 'Zdalne pobieranie ISO jest wyłączone w ustawieniach wyglądu',
    'settings.device.usbWakeupDesc': 'Pozwól zdarzeniom klawiatury lub myszy wybudzać zdalny host',
    'settings.device.usbWakeupTip':
      'Wyłącz, jeśli host zapisuje powtarzające się komunikaty USB wakeup',
    'settings.network.tls.tip':
      'Uwaga: użycie HTTPS może zwiększyć opóźnienie, szczególnie w trybie wideo MJPEG',
    'settings.system.time.servers.description':
      'Użyj domyślnych serwerów publicznych, lokalnego routera lub własnych serwerów NTP',
    'settings.systemLog.remote.protocol': 'Bieżący BusyBox syslogd używa syslog przez UDP',
    'settings.systemLog.viewer.truncated': 'Wyświetlane są tylko najnowsze dane logu',
    'settings.update.system.rawEnableDesc':
      'Pozwól zapisywać zweryfikowane obrazy raw boot/rootfs na kartę SD z tego ekranu',
    'settings.account.totp.description':
      'Wymagaj oprócz hasła kodu czasowego z aplikacji uwierzytelniającej',
    'settings.account.totp.requireDescription':
      'Gdy ta opcja jest włączona, uwierzytelniania dwuskładnikowego nie można wyłączyć, a konto bez niego musi je skonfigurować przed użyciem urządzenia',
    'picoclaw.empty': 'Otwórz panel i rozpocznij zadanie',
    'picoclaw.agent.defaultDescription':
      'Ogólna pomoc dotycząca czatu, wyszukiwania i przestrzeni roboczej',
    'picoclaw.agent.kvmDescription': 'Sterowanie zdalnym hostem poprzez NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime został pomyślnie odinstalowany',
    'picoclaw.install.uninstallFailed': 'Odinstalowanie nie powiodło się',
    'settings.device.swap.tip': 'Włączenie tej funkcji może skrócić żywotność karty SD',
    'settings.update.previewTip':
      'Należy pamiętać, że wersje poglądowe mogą zawierać błędy lub niekompletną funkcjonalność',
    'auth.changePasswordDesc':
      'Dla bezpieczeństwa twojego urządzenia zmień hasło do logowania w sieci',
    'settings.network.dns.manualServersDescription': 'Obsługiwane są serwery IPv4 i IPv6',
    'keyboard.tips': 'Tylko standardowe klawiaturowe znaki i symbole są obsługiwane',
    'terminal.locked': 'Zbyt wiele prób. Spróbuj ponownie później',
    'keyboard.dropdownKorean': 'Koreański',
    'keyboard.dropdownJapanese': 'Japoński',
    'keyboard.placeholder': 'Wprowadź coś',
    'keyboard.leaderKey.recorder.input': 'Naciśnij skrót...',
    'download.inputfile': 'Wprowadź plik obrazu',
    'settings.update.updating': 'Aktualizacja rozpoczęta. Czekaj...',
    'settings.update.offline.invalidName':
      'Nieprawidłowy format nazwy pliku. Pobierz z wydań GitHub.',
    'terminal.sessionClosed':
      'Sesja terminala została zamknięta. Odblokuj ponownie, aby się połączyć.',
    'keyboard.localInput': 'Wprowadzanie z klawiatury mobilnej',
    'settings.network.configuration': 'Konfiguracja',
    'settings.network.dns.servers': 'Serwery',
    'settings.system.firewall.mode.baselineDesc':
      'Otwarty profil zgodności. Zapora działa, ale źródła przychodzące nie są ograniczane. Używaj tylko w zaufanych sieciach.',
    'settings.system.firewall.mode.restrictedDesc':
      'Lokalny HTTPS i SSH oraz wychodzące DNS, NTP, syslog i aktualizacje online. DHCP i niezbędny ruch IPv6 pozostają dostępne. WebRTC jest zablokowany.',
    'settings.system.firewall.mode.paranoidDesc':
      'Lokalny dostęp tylko przez HTTPS. Blokuje SSH, HTTP, aktualizacje online i inne wychodzące funkcje sieciowe. Wgrywanie aktualizacji offline i już przygotowane instalacje pozostają dostępne.',
    'settings.system.firewall.backends': 'Backendy',
    'settings.system.firewall.mode.openTag': 'Przychodzące otwarte',
    'settings.system.firewall.restricted.confirmDesc':
      'Dostęp administracyjny przychodzący zostanie ograniczony do źródeł private IPv4, IPv4 link-local/loopback, IPv6 link-local lub IPv6 loopback dla HTTPS i SSH. Publiczne zakresy źródłowe nie są dozwolone. Wychodzące DNS, NTP, zdalny syslog, aktualizacje online, DHCP, istniejące połączenia i niezbędny ruch sterujący IPv6 pozostaną dostępne. WebRTC/ICE UDP oraz pozostały ruch przychodzący i wychodzący zostaną zablokowane.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Dostępny pozostanie tylko HTTPS ze źródeł private IPv4, IPv4 link-local/loopback, IPv6 link-local lub IPv6 loopback. Publiczne zakresy źródłowe nie są dozwolone. SSH, HTTP, mDNS, NTP, pobieranie z GitHub i pozostały ruch przychodzący/wychodzący zostaną zablokowane z wyjątkiem minimalnego DHCP/ruchu sterującego IPv6.',
    'settings.system.sections.systemLog': 'Logowanie',
    'settings.systemLog.remote.title': 'Zdalne logowanie',
    'settings.systemLog.remote.forward': 'Przekazuj dziennik systemowy',
    'settings.systemLog.remote.description': 'Przekazuj komunikaty systemowe do zdalnego serwera',
    'settings.systemLog.kernel.title': 'Logowanie kernela',
    'settings.systemLog.local.title': 'Bufor dziennika systemowego',
    'settings.systemLog.remote.hostDesc': 'Nazwa hosta lub adres IPv4 serwera syslog',
    'settings.systemLog.kernel.enabledDesc': 'Zapisuj komunikaty kernela w dzienniku systemowym',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Minimalna pilność komunikatu kernela do wypisania na konsoli',
    'settings.systemLog.local.priorityDesc': 'Minimalna pilność komunikatu do zapisania',
    'settings.systemLog.local.bufferDesc': 'Rozmiar dziennika, przy którym plik jest rotowany',
    'settings.systemLog.local.rotationsDesc': 'Liczba przechowywanych rotowanych plików dziennika',
    'settings.systemLog.local.compactDesc': 'Pomiń nazwę hosta i facility w każdym wierszu',
    'settings.systemLog.local.stripTimestampsDesc':
      'Usuń znaczniki czasu dodane przez nadawcę; syslog dodaje własne',
    'settings.systemLog.local.description':
      'Aktualne logi są przechowywane w RAM w {{path}}, aby unikać zapisów na kartę SD',
    'settings.systemLog.kernel.enabled': 'Przekazuj log kernela',
    'settings.device.swap.size': 'Rozmiar swapu',
    'settings.device.swap.description': 'Używaj pliku wymiany, gdy brakuje pamięci',
    'settings.device.swap.sizeDescription': 'Ustaw rozmiar pliku wymiany',
    'settings.device.sections.connectivity': 'Łączność',
    'settings.device.sections.hostConnection': 'Połączenie z hostem',
    'settings.device.sections.inputOutput': 'Wejście i wyjście',
    'settings.device.sections.optimizations': 'Optymalizacje',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'Limit czasu OLED',
    'settings.device.oled.keepOn': 'Zostaw OLED włączony',
    'settings.device.oled.keepOnDescription': 'Nigdy nie wyłączaj ekranu OLED',
    'settings.device.sessionLock.title': 'Blokuj sesję przy braku aktywności'
  },
  pt_br: {
    'auth.illegalPassword':
      'A senha deve ter pelo menos 8 caracteres e não pode conter aspas nem barras',
    'screen.videoDirectTips':
      'Ative o HTTPS em "Configurações > Sistema > Rede" para usar este modo',
    'download.disabled':
      'No momento não é possível baixar nem enviar imagens porque o armazenamento não permite gravação. Se houver uma imagem montada, desmonte-a e depois desative o disco virtual para que o armazenamento volte a permitir gravação.',
    'settings.device.usbWakeup': 'Ativação por USB',
    'settings.device.diskDesc': 'Montar o cartão SD no host remoto',
    'settings.device.diskCancelMount':
      'Ativar o disco virtual cancela a imagem montada. Continuar?',
    'screen.transferRunningTitle': 'Transferência de imagem em andamento',
    'screen.transferRunningDesc':
      'Alterar o modo de vídeo recarrega a página e cancela o upload ou download de imagem em andamento.',
    'screen.transferRunningOk': 'Alterar modo',
    'settings.device.diskTransferRunning':
      'Há uma transferência de imagem em andamento. Aguarde o término antes de ativar o disco virtual.',
    'settings.update.previewChannels':
      'Controla tanto o canal de prévia do aplicativo quanto o do sistema',
    'settings.update.system.appUpdateRequired':
      'Atualize o aplicativo para {{version}} antes de instalar esta atualização do sistema',
    'settings.update.system.requiredAppVersion': 'Versão do aplicativo necessária',
    'settings.system.firewall.enableHttpsFirst':
      'Ative o HTTPS antes de ativar o modo de firewall Restrito ou Paranoico',
    'settings.system.firewall.httpsRequired':
      'Os modos Restrito e Paranoico ficam desativados até que o HTTPS seja ativado em Configurações > Sistema > Rede',
    'settings.system.firewall.mode.baselineDesc':
      'Perfil aberto de compatibilidade. O firewall está ativo, mas as origens de entrada não são restringidas. Use apenas em redes confiáveis.',
    'settings.system.firewall.mode.moderateDesc':
      'Perfil padrão. Mantém os serviços do Base, mas só aceita novas conexões de entrada de faixas privadas, link-local ou loopback. O acesso de saída continua aberto.',
    'settings.system.firewall.mode.paranoidDesc':
      'Acesso HTTPS somente local. Bloqueia SSH, HTTP, atualizações online e outros recursos de rede de saída. O envio de atualizações offline e as instalações já preparadas continuam disponíveis.',
    'settings.system.firewall.mode.current': 'Atual',
    'settings.system.firewall.mode.default': 'Padrão',
    'settings.system.firewall.mode.localOnly': 'Somente local',
    'settings.system.firewall.mode.openTag': 'Entrada aberta',
    'settings.system.firewall.mode.httpsRequiredTag': 'Requer HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Saída aberta',
    'settings.system.firewall.mode.outboundLimited': 'Saída limitada',
    'settings.system.firewall.mode.httpsOnly': 'Somente HTTPS',
    'settings.system.firewall.moderate.apply': 'Mudar para Moderado',
    'settings.system.firewall.baseline.apply': 'Mudar para Base',
    'settings.system.firewall.baseline.confirmTitle': 'Mudar para o modo Base aberto?',
    'settings.system.firewall.baseline.confirmDesc':
      'O serviço de firewall continua ativo, mas a restrição a faixas de origem somente locais é removida. Faixas de origem públicas podem alcançar os serviços expostos do NanoKVM se a rede as rotear.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC está desativado nos modos de firewall Restrito e Paranoico',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Moderado',
    'settings.system.firewall.mode.restricted': 'Restrito',
    'settings.system.firewall.mode.paranoid': 'Paranoico',
    'settings.system.firewall.restricted.enable': 'Ativar Restrito',
    'settings.system.firewall.restricted.confirmTitle': 'Ativar o modo Restrito?',
    'settings.system.firewall.paranoid.enable': 'Ativar Paranoico',
    'settings.system.firewall.paranoid.confirmTitle': 'Ativar o modo Paranoico?',
    'settings.update.paranoidBlocked':
      'Atualizações online são bloqueadas pelo modo de firewall Paranoico',
    'settings.device.hidOnlyDesc':
      'Melhora a compatibilidade com o host se o mouse ou o teclado pararem de responder',
    'mouse.hidOnly.desc':
      'Se o mouse ou o teclado pararem de responder e redefinir o HID não ajudar, pode haver um problema de compatibilidade entre o NanoKVM e o host.',
    'settings.device.hidOnlyTip':
      'O modo HID-Only deixa de emular dispositivos virtuais e mantém apenas o controle básico HID',
    'settings.device.ssh.tip':
      'Defina uma senha forte em Conta > Senha antes de habilitar esta opção',
    'keyboard.shortcut.captureTips':
      'Capturar teclas do sistema, como a tecla Windows, requer permissão de tela cheia',
    'settings.device.diskLocked':
      'Desligado enquanto uma imagem estiver montada, e ligá-lo cancela a montagem',
    'image.tips.usb2':
      'Certifique-se de que o disco virtual está montado em Configurações > Dispositivo > Disco Virtual.',
    'image.tips.tf2': 'Remova o cartão TF do NanoKVM. Na versão FULL, desmonte a caixa primeiro.',
    'auth.tips.change3': 'Senha root do sistema para login SSH',
    'download.sha256': 'Checksum SHA-256 opcional',
    'power.powerShort': 'Botão de energia: clique curto',
    'power.powerLong': 'Botão de energia: clique longo',
    'settings.tailscale.notInstall': 'Tailscale não encontrado. Por favor, instale.',
    'settings.tailscale.retry': 'Por favor, atualize e tente novamente, ou instale manualmente.',
    'wifi.success': 'Por favor, verifique o status da rede do NanoKVM e visite o novo endereço IP',
    'wifi.failed': 'Operação falhou, por favor, tente novamente',
    'screen.webrtcConnectionFailed.description':
      'Verifique a conexão de rede ou alterne o modo de vídeo',
    'keyboard.shortcut.enterFullScreen': 'Alternar modo de tela cheia',
    'keyboard.leaderKey.desc':
      'Ignore as restrições do navegador e envie atalhos do sistema diretamente para o host remoto',
    'image.mountDesc':
      'Em alguns sistemas, é necessário ejetar o disco virtual no host remoto antes de montar a imagem',
    'image.unmountDesc':
      'Em alguns sistemas, é necessário ejetar manualmente do host remoto antes de desmontar a imagem',
    'auth.totp.prompt': 'Digite o código de 6 dígitos do seu app autenticador',
    'auth.totp.backupPrompt': 'Digite um dos seus códigos de backup',
    'auth.setupRecovery': 'Se esta senha for perdida, a recuperação exige regravar o cartão SD',
    'download.diskShared': 'Desligue primeiro o disco virtual e depois use o download de imagens',
    'download.remoteDisabled':
      'O download remoto de ISO está desativado em Configurações > Aparência',
    'settings.device.usbWakeupDesc':
      'Permite que eventos de teclado ou mouse acordem o host remoto',
    'settings.device.usbWakeupTip': 'Desative se o host registrar mensagens USB wakeup repetidas',
    'settings.network.tls.tip':
      'Atenção: O uso de HTTPS pode aumentar a latência, especialmente com o modo de vídeo MJPEG',
    'settings.system.time.servers.description':
      'Use os servidores públicos padrão, seu roteador local ou servidores NTP personalizados',
    'settings.systemLog.remote.protocol': 'O syslog UDP é usado pelo BusyBox syslogd atual',
    'settings.systemLog.viewer.truncated': 'Apenas os dados de log mais recentes são exibidos',
    'settings.update.system.rawEnableDesc':
      'Permite gravar imagens raw boot/rootfs verificadas no cartão SD a partir desta tela',
    'settings.account.totp.description':
      'Exige um código temporário de um app autenticador além da senha',
    'settings.account.totp.requireDescription':
      'Enquanto estiver ativada, a autenticação em duas etapas não pode ser desativada, e uma conta sem ela precisa configurá-la antes de usar o dispositivo',
    'picoclaw.empty': 'Abra o painel e inicie uma tarefa para começar',
    'picoclaw.agent.defaultDescription':
      'Ajuda geral sobre bate-papo, pesquisa e espaço de trabalho',
    'picoclaw.agent.kvmDescription': 'Opera o host remoto por meio de NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime desinstalado com sucesso',
    'picoclaw.install.uninstallFailed': 'Falha na desinstalação',
    'settings.device.swap.tip': 'Habilitar esta função pode encurtar a vida útil do seu cartão SD',
    'settings.update.previewTip':
      'Esteja ciente de que as versões de prévia podem conter bugs ou funcionalidade incompleta',
    'auth.changePasswordDesc': 'Para a segurança do seu dispositivo, por favor, mude a senha',
    'settings.network.dns.manualServersDescription': 'Servidores IPv4 e IPv6 são compatíveis',
    'settings.tailscale.stopDesc': 'Sair e desativar a inicialização automática.',
    'terminal.unlockDesc': 'Digite a senha da conta web para iniciar uma sessão de terminal',
    'terminal.locked': 'Muitas tentativas. Tente novamente mais tarde',
    'keyboard.dropdownKorean': 'Coreano',
    'keyboard.dropdownJapanese': 'Japonês',
    'keyboard.localInput': 'Entrada do teclado do celular',
    'settings.network.configuration': 'Configuração',
    'settings.network.dns.servers': 'Servidores',
    'settings.system.firewall.mode.restrictedDesc':
      'Somente HTTPS e SSH locais, além de DNS, NTP, syslog e atualizações online de saída. DHCP e o tráfego IPv6 essencial continuam disponíveis. O WebRTC está bloqueado.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'O acesso administrativo de entrada será limitado a faixas private IPv4, IPv4 link-local/loopback, IPv6 link-local ou IPv6 loopback para HTTPS e SSH. Faixas públicas de origem não são permitidas. DNS, NTP, syslog remoto, atualizações online, DHCP, conexões estabelecidas e tráfego essencial IPv6 de saída permanecerão disponíveis. WebRTC/ICE UDP e demais tráfegos de entrada/saída serão bloqueados.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Apenas acesso HTTPS de faixas private IPv4, IPv4 link-local/loopback, IPv6 link-local ou IPv6 loopback permanecerá disponível. SSH, HTTP, mDNS, NTP, downloads do GitHub e outro tráfego serão bloqueados exceto DHCP/controle IPv6 mínimo.',
    'settings.system.sections.systemLog': 'Registros',
    'settings.systemLog.remote.title': 'Registro remoto',
    'settings.systemLog.remote.forward': 'Encaminhar log do sistema',
    'settings.systemLog.remote.description':
      'Encaminha as mensagens do sistema para um servidor remoto',
    'settings.systemLog.kernel.title': 'Registro do kernel',
    'settings.systemLog.local.title': 'Buffer do log do sistema',
    'settings.systemLog.remote.hostDesc': 'Nome do host ou endereço IPv4 do servidor syslog',
    'settings.systemLog.kernel.enabledDesc': 'Captura as mensagens do kernel no log do sistema',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Urgência mínima para uma mensagem do kernel ser impressa no console',
    'settings.systemLog.local.priorityDesc': 'Urgência mínima para uma mensagem ser registrada',
    'settings.systemLog.local.bufferDesc': 'Tamanho do log em que o arquivo é rotacionado',
    'settings.systemLog.local.rotationsDesc':
      'Número de arquivos de log rotacionados que são mantidos',
    'settings.systemLog.local.compactDesc': 'Omite o nome do host e a facility de cada linha',
    'settings.systemLog.local.stripTimestampsDesc':
      'Remove os carimbos de data e hora adicionados pelo remetente; o syslog adiciona os seus',
    'settings.systemLog.local.description':
      'Os logs atuais ficam em RAM em {{path}} para evitar gravações no cartão SD',
    'settings.systemLog.kernel.enabled': 'Encaminhar log do kernel',
    'settings.device.swap.size': 'Tamanho do swap',
    'settings.device.swap.description': 'Use um arquivo de swap quando a memória estiver acabando',
    'settings.device.swap.sizeDescription': 'Defina o tamanho do arquivo de swap',
    'settings.device.sections.connectivity': 'Conectividade',
    'settings.device.sections.hostConnection': 'Conexão com o host',
    'settings.device.sections.inputOutput': 'Entrada e saída',
    'settings.device.sections.optimizations': 'Otimizações',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'Tempo limite do OLED',
    'settings.device.oled.keepOn': 'Manter o OLED ligado',
    'settings.device.oled.keepOnDescription': 'Nunca desligar a tela OLED',
    'settings.device.sessionLock.title': 'Bloquear sessão quando inativa'
  },
  ru: {
    'download.disabled':
      'Сейчас нельзя скачивать или загружать образы, потому что хранилище недоступно для записи. Если образ смонтирован, размонтируйте его, а затем отключите виртуальный диск, чтобы хранилище снова стало доступным для записи.',
    'keyboard.submit': 'Отправить',
    'keyboard.shortcut.title': 'Сочетания клавиш',
    'settings.device.mouseJiggler.title': 'Имитация движения мыши',
    'settings.device.ssh.tip':
      'Задайте надёжный пароль в разделе Аккаунт > Пароль перед включением этой опции',
    'screen.frameDetect': 'Обнаружение изменений кадров',
    'settings.device.diskDesc': 'Смонтировать SD-карту на удалённом хосте',
    'settings.device.diskCancelMount':
      'Включение виртуального диска отменит смонтированный образ. Продолжить?',
    'screen.transferRunningTitle': 'Идёт передача образа',
    'screen.transferRunningDesc':
      'Смена видеорежима перезагружает страницу и отменяет текущую загрузку или скачивание образа.',
    'screen.transferRunningOk': 'Сменить режим',
    'settings.device.diskTransferRunning':
      'Идёт передача образа. Дождитесь её завершения, прежде чем включать виртуальный диск.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC отключен в режимах брандмауэра «Ограниченный» и «Параноидальный»',
    'settings.system.firewall.enableHttpsFirst':
      'Перед включением режима брандмауэра «Ограниченный» или «Параноидальный» включите HTTPS',
    'settings.system.firewall.httpsRequired':
      'Режимы «Ограниченный» и «Параноидальный» недоступны, пока HTTPS не включен в Настройки > Система > Сеть',
    'settings.system.firewall.mode.baseline': 'Базовый',
    'settings.system.firewall.mode.moderate': 'Умеренный',
    'settings.system.firewall.mode.moderateDesc':
      'Дефолтный профиль. Сохраняет сервисы baseline, но принимает новые входящие соединения только из private, link-local или loopback диапазонов. Исходящий доступ остаётся открытым.',
    'settings.system.firewall.mode.restricted': 'Ограниченный',
    'settings.system.firewall.mode.paranoid': 'Параноидальный',
    'settings.system.firewall.moderate.apply': 'Переключить на «Умеренный»',
    'settings.system.firewall.restricted.enable': 'Включить «Ограниченный»',
    'settings.system.firewall.restricted.confirmTitle':
      'Включить режим брандмауэра «Ограниченный»?',
    'settings.system.firewall.paranoid.enable': 'Включить «Параноидальный»',
    'settings.system.firewall.paranoid.confirmTitle':
      'Включить режим брандмауэра «Параноидальный»?',
    'settings.system.firewall.baseline.apply': 'Переключить на «Базовый»',
    'settings.system.firewall.baseline.confirmTitle': 'Переключить на открытый режим «Базовый»?',
    'settings.update.paranoidBlocked':
      'Онлайн-обновления заблокированы режимом брандмауэра «Параноидальный»',
    'settings.device.hidOnlyDesc':
      'Улучшает совместимость с хостом, если мышь или клавиатура перестали отвечать',
    'mouse.hidOnly.desc':
      'Если мышь или клавиатура перестали отвечать и сброс HID не помогает, возможно, это проблема совместимости между NanoKVM и хостом.',
    'settings.device.hidOnlyTip':
      'Режим HID-Only прекращает эмуляцию виртуальных устройств и сохраняет только базовое управление HID',
    'keyboard.shortcut.captureTips':
      'Для захвата системных клавиш, например клавиши Windows, требуется разрешение полноэкранного режима',
    'settings.device.diskLocked':
      'Отключён, пока смонтирован образ, а включение отменит монтирование',
    'image.tips.usb2':
      'Убедитесь, что виртуальный диск подключен в разделе Настройки > Устройство > Виртуальный диск.',
    'image.tips.tf2': 'Извлеките карту TF из NanoKVM. В версии FULL сначала разберите корпус.',
    'auth.tips.change3': 'Пароль системного пользователя "root" для входа по SSH',
    'download.sha256': 'Необязательная контрольная сумма SHA-256',
    'power.powerShort': 'Кнопка питания: короткое нажатие',
    'power.powerLong': 'Кнопка питания: длинное нажатие',
    'settings.tailscale.notInstall': 'Tailscale не найден. Пожалуйста, установите.',
    'settings.tailscale.retry': 'Пожалуйста, обновите и попробуйте снова или установите вручную.',
    'wifi.success':
      'Пожалуйста, проверьте сетевой статус NanoKVM и откройте в браузере новый IP адрес',
    'wifi.failed': 'Операция не удалась, пожалуйста попробуйте снова',
    'screen.webrtcConnectionFailed.description':
      'Проверьте сетевое подключение или переключите режим видео',
    'keyboard.shortcut.enterFullScreen': 'Переключить полноэкранный режим',
    'keyboard.leaderKey.desc':
      'Обход ограничений браузера и отправка системных ярлыков непосредственно на удаленный хост',
    'image.mountDesc':
      'В некоторых системах необходимо отсоединить виртуальный диск на удаленном хосте перед монтированием образа',
    'image.unmountDesc':
      'В некоторых системах перед размонтированием образа необходимо вручную извлечь образ с удаленного хоста',
    'terminal.unlockDesc': 'Введите пароль веб-аккаунта, чтобы запустить терминальную сессию',
    'auth.totp.prompt': 'Введите 6-значный код из приложения-аутентификатора',
    'auth.totp.backupPrompt': 'Введите один из ваших резервных кодов',
    'auth.setupRecovery':
      'Если этот пароль будет потерян, восстановление возможно только перепрошивкой SD-карты',
    'download.diskShared': 'Сначала отключите виртуальный диск, затем используйте загрузку образов',
    'download.remoteDisabled': 'Удаленное скачивание ISO отключено в Настройки > Внешний вид',
    'settings.device.usbWakeupDesc': 'Разрешить клавиатуре или мыши будить удаленный хост',
    'settings.device.usbWakeupTip': 'Выключите, если хост пишет повторяющиеся USB wakeup-сообщения',
    'settings.network.tls.tip':
      'Имейте в виду: использование HTTPS может увеличить задержку, особенно в режиме видео MJPEG',
    'settings.system.time.servers.description':
      'Используйте публичные серверы по умолчанию, локальный маршрутизатор или собственные NTP-серверы',
    'settings.systemLog.remote.protocol': 'Текущий BusyBox syslogd использует UDP syslog',
    'settings.systemLog.viewer.truncated': 'Показана только последняя часть лога',
    'settings.update.system.appUpdateRequired':
      'Перед установкой этого системного обновления обновите приложение до версии {{version}}',
    'settings.update.system.rawEnableDesc':
      'Разрешить запись проверенных raw-образов boot/rootfs на разделы SD-карты с этого экрана',
    'settings.account.totp.description':
      'Требовать, помимо пароля, одноразовый код из приложения-аутентификатора',
    'settings.account.totp.requireDescription':
      'Пока опция включена, двухфакторную аутентификацию нельзя отключить, а учётная запись без неё должна настроить её перед использованием устройства',
    'picoclaw.empty': 'Откройте панель и запустите задачу для начала',
    'picoclaw.agent.defaultDescription': 'Общая помощь в чате, поиске и рабочей области',
    'picoclaw.agent.kvmDescription': 'Управляйте удаленным хостом через NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime успешно удален',
    'picoclaw.install.uninstallFailed': 'Не удалось удалить',
    'settings.device.swap.tip':
      'Включение этой опции может негативно сказаться на долговечности SD-карты',
    'settings.update.previewTip':
      'Обратите внимание: в ранних версиях могут быть ошибки или незавершённый функционал',
    'auth.changePasswordDesc': 'Для безопасности вашего устройства, пожалуйста поменяйте пароль',
    'settings.network.dns.manualServersDescription': 'Поддерживаются серверы IPv4 и IPv6',
    'settings.tailscale.stopDesc': 'Выйти и отключить автозапуск.',
    'auth.locked': 'Слишком много входов. Повторите попытку позже',
    'auth.globalLocked': 'Система находится под защитой. Повторите попытку позже',
    'wifi.ap.authDescription': 'Пожалуйста, введите пароль AP, чтобы продолжить',
    'keyboard.clipboardReadError': 'Не удалось прочитать буфер обмена',
    'keyboard.leaderKey.recorder.rec': 'ЗАП',
    'terminal.locked': 'Слишком много попыток. Повторите позже',
    'settings.appearance.menuBar.modeOff': 'Выкл',
    'settings.keyboardLedStatus.on': 'Вкл',
    'settings.keyboardLedStatus.off': 'Выкл',
    'picoclaw.inputPlaceholder': 'Опишите, что вы хотите от PicoClaw',
    'picoclaw.agent.switchFailed': 'Не удалось переключить роль агента',
    'picoclaw.model.saved': 'Конфигурация модели сохранена',
    'picoclaw.model.saveFailed': 'Не удалось сохранить конфигурацию модели',
    'picoclaw.history.loadFailed': 'Не удалось загрузить историю сеансов',
    'picoclaw.history.deleteFailed': 'Не удалось удалить сеанс',
    'keyboard.dropdownKorean': 'Корейский',
    'keyboard.dropdownJapanese': 'Японский',
    'mouse.mobile.touchSyncDesc':
      'Двигайте курсор в любой области KVM. Позиция сохраняется между касаниями и синхронизируется через абсолютный HID.',
    'keyboard.localInput': 'Ввод с мобильной клавиатуры',
    'settings.network.configuration': 'Конфигурация',
    'settings.network.dns.servers': 'Серверы',
    'settings.system.firewall.mode.baselineDesc':
      'Открытый профиль совместимости. Файрвол работает, но входящие источники не ограничиваются. Используйте только в доверенных сетях.',
    'settings.system.firewall.mode.restrictedDesc':
      'Только локальные HTTPS и SSH, плюс исходящие DNS, NTP, syslog и онлайн-обновления. DHCP и необходимый трафик IPv6 остаются доступными. WebRTC заблокирован.',
    'settings.system.firewall.mode.paranoidDesc':
      'Только локальный HTTPS-доступ. Блокирует SSH, HTTP, онлайн-обновления и другие исходящие сетевые функции. Загрузка офлайн-обновлений и уже подготовленные установки остаются доступными.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.mode.openTag': 'Входящие открыты',
    'settings.system.firewall.restricted.confirmDesc':
      'Входящий административный доступ будет ограничен private IPv4, IPv4 link-local/loopback, IPv6 link-local или IPv6 loopback source ranges для HTTPS и SSH. Публичные source ranges не разрешаются. Исходящие DNS, NTP, удаленный syslog, онлайн-обновления, DHCP, established-соединения и минимальный IPv6 control traffic останутся доступны. WebRTC/ICE UDP и прочий входящий/исходящий трафик будут заблокированы.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Останется доступ только по HTTPS из private IPv4, IPv4 link-local/loopback, IPv6 link-local или IPv6 loopback source ranges. Публичные source ranges не разрешаются. SSH, HTTP, mDNS, NTP, загрузки с GitHub и прочий входящий/исходящий трафик будут заблокированы, кроме минимального DHCP/IPv6 control traffic.',
    'settings.system.sections.systemLog': 'Журналирование',
    'settings.systemLog.remote.title': 'Удаленное журналирование',
    'settings.systemLog.remote.forward': 'Отправлять системный лог',
    'settings.systemLog.remote.description': 'Отправка системных сообщений на удаленный сервер',
    'settings.systemLog.kernel.title': 'Журналирование ядра',
    'settings.systemLog.local.title': 'Буфер системного лога',
    'settings.systemLog.remote.hostDesc': 'Имя хоста или адрес IPv4 syslog-сервера',
    'settings.systemLog.kernel.enabledDesc': 'Записывать сообщения ядра в системный лог',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Минимальная срочность сообщения ядра для вывода в консоль',
    'settings.systemLog.local.priorityDesc': 'Минимальная срочность сообщения для записи в лог',
    'settings.systemLog.local.bufferDesc': 'Размер лога, при котором файл ротируется',
    'settings.systemLog.local.rotationsDesc': 'Количество хранимых ротированных файлов лога',
    'settings.systemLog.local.compactDesc': 'Не включать в каждую строку имя хоста и facility',
    'settings.systemLog.local.stripTimestampsDesc':
      'Удалять метки времени, добавленные отправителем; syslog добавляет свои',
    'settings.systemLog.local.description':
      'Текущие логи хранятся в RAM по пути {{path}}, без записи на SD-карту',
    'settings.systemLog.kernel.enabled': 'Отправлять лог ядра',
    'settings.device.swap.size': 'Размер файла подкачки',
    'settings.device.swap.description': 'Использовать файл подкачки, когда не хватает памяти',
    'settings.device.swap.sizeDescription': 'Задать размер файла подкачки',
    'settings.device.sections.connectivity': 'Подключение',
    'settings.device.sections.hostConnection': 'Подключение к хосту',
    'settings.device.sections.inputOutput': 'Ввод и вывод',
    'settings.device.sections.optimizations': 'Оптимизация',
    'settings.device.minutes': 'мин',
    'settings.device.oled.title': 'Тайм-аут OLED',
    'settings.device.oled.keepOn': 'Не выключать OLED',
    'settings.device.oled.keepOnDescription': 'Никогда не выключать экран OLED',
    'settings.device.sessionLock.title': 'Блокировать сессию при бездействии'
  },
  se: {
    'auth.illegalPassword':
      'Lösenordet måste vara minst 8 tecken och får inte innehålla citattecken eller snedstreck',
    'screen.videoDirectTips':
      'Aktivera HTTPS under "Inställningar > System > Nätverk" för att använda detta läge',
    'download.disabled':
      'Avbildningar kan inte laddas ned eller laddas upp just nu eftersom lagringen inte är skrivbar. Om en avbildning är monterad, avmontera den och stäng sedan av den virtuella disken så att lagringen blir skrivbar igen.',
    'download.sha256': 'Valfri SHA-256-kontrollsumma',
    'download.sha256Placeholder': 'Ange en SHA-256-kontrollsumma på 64 tecken',
    'download.invalidSHA256': 'SHA-256 måste vara en hexadecimal sträng på 64 tecken',
    'download.checksumFailed': 'Nedladdningen misslyckades: SHA-256-verifieringen misslyckades',
    'keyboard.dropdownRussian': 'Ryska',
    'settings.device.diskDesc': 'Montera SD-kortet på fjärrvärden',
    'settings.device.diskCancelMount':
      'Om du aktiverar den virtuella disken avbryts den monterade avbildningen. Fortsätta?',
    'screen.transferRunningTitle': 'Avbildningsöverföring pågår',
    'screen.transferRunningDesc':
      'Om du byter videoläge laddas sidan om, och den pågående uppladdningen eller nedladdningen av avbildningen avbryts.',
    'screen.transferRunningOk': 'Byt läge',
    'settings.device.diskTransferRunning':
      'En avbildningsöverföring pågår. Vänta tills den är klar innan du aktiverar den virtuella disken.',
    'settings.update.previewChannels':
      'Styr både förhandsgranskningskanalerna för programmet och systemet',
    'settings.update.system.appUpdateRequired':
      'Uppdatera programmet till {{version}} innan du installerar den här systemuppdateringen',
    'settings.update.system.requiredAppVersion': 'Programversion som krävs',
    'settings.system.firewall.enableHttpsFirst':
      'Aktivera HTTPS innan du aktiverar brandväggsläget Begränsad eller Paranoid',
    'settings.system.firewall.httpsRequired':
      'Lägena Begränsad och Paranoid är inaktiverade tills HTTPS har aktiverats under Inställningar > System > Nätverk',
    'settings.system.firewall.mode.baselineDesc':
      'Öppen kompatibilitetsprofil. Brandväggen körs, men inkommande källor begränsas inte. Använd bara i betrodda nätverk.',
    'settings.system.firewall.mode.moderateDesc':
      'Standardprofil. Behåller Bas-tjänsterna men tar bara emot nya inkommande anslutningar från privata, link-local- eller loopback-intervall. Utgående åtkomst förblir öppen.',
    'settings.system.firewall.mode.paranoidDesc':
      'Endast lokal HTTPS-åtkomst. Blockerar SSH, HTTP, onlineuppdateringar och andra utgående nätverksfunktioner. Uppladdning av offlineuppdateringar och redan förberedda installationer är fortfarande tillgängliga.',
    'settings.system.firewall.mode.current': 'Aktuell',
    'settings.system.firewall.mode.default': 'Standard',
    'settings.system.firewall.mode.localOnly': 'Endast lokalt',
    'settings.system.firewall.mode.openTag': 'Inkommande öppen',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS krävs',
    'settings.system.firewall.mode.outboundOpen': 'Utgående öppen',
    'settings.system.firewall.mode.outboundLimited': 'Utgående begränsad',
    'settings.system.firewall.mode.httpsOnly': 'Endast HTTPS',
    'settings.system.firewall.moderate.apply': 'Byt till Måttlig',
    'settings.system.firewall.baseline.apply': 'Byt till Bas',
    'settings.system.firewall.baseline.confirmTitle': 'Byta till öppet läge Bas?',
    'settings.system.firewall.baseline.confirmDesc':
      'Brandväggstjänsten förblir aktiv, men begränsningen till lokala källintervall tas bort. Offentliga källintervall kan nå exponerade NanoKVM-tjänster om nätverket routar dem.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC är inaktiverat i brandväggslägena Begränsad och Paranoid',
    'settings.system.firewall.mode.baseline': 'Bas',
    'settings.system.firewall.mode.moderate': 'Måttlig',
    'settings.system.firewall.mode.restricted': 'Begränsad',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Aktivera Begränsad',
    'settings.system.firewall.restricted.confirmTitle': 'Aktivera brandväggsläget Begränsad?',
    'settings.system.firewall.paranoid.enable': 'Aktivera Paranoid',
    'settings.system.firewall.paranoid.confirmTitle': 'Aktivera brandväggsläget Paranoid?',
    'settings.update.paranoidBlocked': 'Onlineuppdateringar blockeras av brandväggsläget Paranoid',
    'settings.device.hidOnlyDesc':
      'Förbättrar kompatibiliteten med värden om musen eller tangentbordet slutar svara',
    'mouse.hidOnly.desc':
      'Om musen eller tangentbordet slutar svara och det inte hjälper att återställa HID kan det vara ett kompatibilitetsproblem mellan NanoKVM och värden.',
    'settings.device.hidOnlyTip':
      'HID-Only-läge slutar emulera virtuella enheter och behåller bara grundläggande HID-kontroll',
    'settings.device.ssh.tip':
      'Ställ in ett starkt lösenord under Konto > Lösenord innan du aktiverar det här alternativet',
    'keyboard.shortcut.captureTips':
      'Att fånga systemtangenter, som Windows-tangenten, kräver helskärmsbehörighet',
    'settings.device.diskLocked':
      'Avstängd medan en avbildning är monterad, och aktivering avbryter monteringen',
    'image.tips.usb2':
      'Säkerställ att den virtuella disken är monterad under Inställningar > Enhet > Virtuell disk.',
    'image.tips.tf2': 'Ta ut TF-kortet från NanoKVM. På FULL-versionen öppnar du chassit först.',
    'auth.tips.change3': 'Systemets root-lösenord för SSH-inloggning',
    'power.powerShort': 'Strömknapp: kort tryck',
    'power.powerLong': 'Strömknapp: långt tryck',
    'settings.tailscale.notInstall': 'Tailscale hittades inte. Installera först.',
    'settings.tailscale.retry': 'Uppdatera sidan och försök igen, eller installera manuellt.',
    'wifi.success': 'Kontrollera nätverksstatusen för NanoKVM och besök den nya IP-adressen',
    'wifi.failed': 'Åtgärden misslyckades, försök igen',
    'screen.webrtcConnectionFailed.description':
      'Kontrollera nätverksanslutningen eller byt videoläge',
    'keyboard.shortcut.enterFullScreen': 'Växla helskärmsläge',
    'keyboard.leaderKey.desc':
      'Gå förbi webbläsarbegränsningar och skicka systemgenvägar direkt till fjärrvärden',
    'image.mountDesc':
      'I vissa system måste den virtuella disken avmonteras på fjärrvärden innan avbildningen monteras',
    'image.unmountDesc':
      'I vissa system måste du manuellt mata ut från fjärrvärden innan du avmonterar avbildningen',
    'auth.totp.prompt': 'Ange den sexsiffriga koden från din autentiseringsapp',
    'auth.totp.backupPrompt': 'Ange en av dina reservkoder',
    'auth.setupRecovery': 'Om lösenordet förloras kräver återställning att SD-kortet skrivs om',
    'download.diskShared': 'Stäng av den virtuella disken först och använd sedan nedladdningen',
    'download.remoteDisabled': 'Fjärrnedladdning av ISO är inaktiverad i Inställningar > Utseende',
    'settings.device.usbWakeupDesc':
      'Tillåt tangentbords- eller mushändelser att väcka fjärrvärden',
    'settings.device.usbWakeupTip': 'Stäng av om värden loggar upprepade USB wakeup-meddelanden',
    'settings.network.tls.tip':
      'Observera: Användning av HTTPS kan öka fördröjningen, särskilt med MJPEG-läge',
    'settings.system.time.servers.description':
      'Använd standardservrarna, din lokala router eller egna NTP-servrar',
    'settings.systemLog.remote.protocol': 'UDP-syslog används av aktuell BusyBox syslogd',
    'settings.systemLog.viewer.truncated': 'Endast de senaste loggdata visas',
    'settings.update.system.rawEnableDesc':
      'Tillåt att verifierade raw boot/rootfs-images skrivs till SD-kortet från denna skärm',
    'settings.account.totp.description':
      'Kräv en tidsbaserad kod från en autentiseringsapp utöver lösenordet',
    'settings.account.totp.requireDescription':
      'Medan detta är på kan tvåfaktorsautentisering inte inaktiveras, och ett konto utan den måste konfigurera den innan enheten kan användas',
    'picoclaw.empty': 'Öppna panelen och starta en uppgift för att börja',
    'picoclaw.agent.defaultDescription': 'Allmän hjälp för chatt, sökning och arbetsyta',
    'picoclaw.agent.kvmDescription': 'Manövrera fjärrvärden genom NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime avinstallerades framgångsrikt',
    'picoclaw.install.uninstallFailed': 'Avinstallationen misslyckades',
    'settings.device.swap.tip':
      'Aktivering av denna funktion kan förkorta livslängden på ditt SD-kort',
    'settings.update.previewTip':
      'Observera att förhandsversioner kan innehålla buggar eller ofullständig funktionalitet',
    'auth.changePasswordDesc': 'För din enhets säkerhet, byt lösenord',
    'settings.network.dns.manualServersDescription': 'IPv4- och IPv6-servrar stöds',
    'settings.tailscale.stopDesc': 'Logga ut och stäng av automatisk start.',
    'terminal.unlockDesc': 'Ange lösenordet för webbkonto för att starta en terminalsession',
    'terminal.locked': 'För många försök. Försök igen senare',
    'keyboard.dropdownKorean': 'Koreanska',
    'keyboard.dropdownJapanese': 'Japanska',
    'keyboard.localInput': 'Inmatning från mobiltangentbord',
    'settings.network.configuration': 'Konfiguration',
    'settings.network.dns.servers': 'Servrar',
    'settings.system.firewall.mode.restrictedDesc':
      'Endast lokal HTTPS och SSH, plus utgående DNS, NTP, syslog och onlineuppdateringar. DHCP och nödvändig IPv6-trafik förblir tillgänglig. WebRTC är blockerat.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'Inkommande administratörsåtkomst begränsas till private IPv4-, IPv4 link-local/loopback-, IPv6 link-local- eller IPv6 loopback-källor för HTTPS och SSH. Offentliga källintervall tillåts inte. Utgående DNS, NTP, fjärr-syslog, onlineuppdateringar, DHCP, etablerade anslutningar och nödvändig IPv6-kontrolltrafik förblir tillgängliga. WebRTC/ICE UDP och annan in-/utgående trafik blockeras.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Endast HTTPS-åtkomst från private IPv4, IPv4 link-local/loopback, IPv6 link-local eller IPv6 loopback är tillgänglig. SSH, HTTP, mDNS, NTP, GitHub-nedladdningar och annan trafik blockeras utom minimal DHCP/IPv6-kontroll.',
    'settings.system.sections.systemLog': 'Loggning',
    'settings.systemLog.remote.title': 'Fjärrloggning',
    'settings.systemLog.remote.forward': 'Vidarebefordra systemlogg',
    'settings.systemLog.remote.description': 'Vidarebefordra systemmeddelanden till en fjärrserver',
    'settings.systemLog.kernel.title': 'Kärnloggning',
    'settings.systemLog.local.title': 'Systemloggbuffert',
    'settings.systemLog.remote.hostDesc': 'Värdnamn eller IPv4-adress till syslog-servern',
    'settings.systemLog.kernel.enabledDesc': 'Fånga kärnmeddelanden i systemloggen',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Lägsta brådskandegrad för att ett kärnmeddelande ska skrivas ut på konsolen',
    'settings.systemLog.local.priorityDesc':
      'Lägsta brådskandegrad för att ett meddelande ska loggas',
    'settings.systemLog.local.bufferDesc': 'Loggstorlek där filen roteras',
    'settings.systemLog.local.rotationsDesc': 'Antal roterade loggfiler som sparas',
    'settings.systemLog.local.compactDesc': 'Utelämna värdnamn och facility från varje rad',
    'settings.systemLog.local.stripTimestampsDesc':
      'Ta bort tidsstämplar som lagts till av avsändaren; syslog lägger till sina egna',
    'settings.systemLog.local.description':
      'Aktuella loggar hålls i RAM på {{path}} för att undvika skrivningar till SD-kortet',
    'settings.systemLog.kernel.enabled': 'Vidarebefordra kärnlogg',
    'settings.device.swap.size': 'Swap-storlek',
    'settings.device.swap.description': 'Använd en swap-fil när minnet börjar ta slut',
    'settings.device.swap.sizeDescription': 'Ange swap-filens storlek',
    'settings.device.sections.connectivity': 'Anslutning',
    'settings.device.sections.hostConnection': 'Värdanslutning',
    'settings.device.sections.inputOutput': 'Indata och utdata',
    'settings.device.sections.optimizations': 'Optimeringar',
    'settings.device.minutes': 'min',
    'settings.device.oled.title': 'OLED-timeout',
    'settings.device.oled.keepOn': 'Håll OLED på',
    'settings.device.oled.keepOnDescription': 'Stäng aldrig av OLED-skärmen',
    'settings.device.sessionLock.title': 'Lås session vid inaktivitet'
  },
  th: {
    'auth.illegalPassword':
      'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร และห้ามมีเครื่องหมายคำพูดหรือเครื่องหมายทับ',
    'screen.videoDirectTips': 'เปิดใช้งาน HTTPS ใน "การตั้งค่า > ระบบ > เครือข่าย" เพื่อใช้โหมดนี้',
    'download.disabled':
      'ตอนนี้ไม่สามารถดาวน์โหลดหรืออัปโหลดอิมเมจได้เพราะที่เก็บข้อมูลเขียนไม่ได้ หากมีการเมานต์อิมเมจอยู่ ให้ยกเลิกการเมานต์ก่อน แล้วปิดดิสก์เสมือนเพื่อให้เขียนที่เก็บข้อมูลได้อีกครั้ง',
    'auth.placeholderPassword': 'รหัสผ่าน',
    'auth.noEmptyPassword': 'ต้องใส่รหัสผ่าน',
    'wifi.description': 'ตั้งค่า Wi-Fi สำหรับ NanoKVM',
    'keyboard.title': 'คีย์บอร์ด',
    'settings.about.title': 'เกี่ยวกับ NanoKVM',
    'wifi.success': 'โปรดไปที่อุปกรณ์เพื่อตรวจสอบสถานะเครือข่ายของ NanoKVM',
    'auth.tips.change1': 'โปรดทราบว่าการดำเนินการนี้จะเปลี่ยนรหัสผ่านต่อไปนี้:',
    'auth.tips.change2': 'รหัสผ่านเว็บไซต์',
    'settings.about.application': 'เวอร์ชันแอปพลิเคชัน',
    'settings.device.ssh.tip':
      'ตั้งรหัสผ่านที่ปลอดภัยใน บัญชี > รหัสผ่าน ก่อนเปิดใช้งานตัวเลือกนี้',
    'keyboard.shortcut.clear': 'ล้าง',
    'screen.resolution': 'ความละเอียด',
    'settings.device.diskDesc': 'เมานต์การ์ด SD บนโฮสต์ระยะไกล',
    'settings.device.diskCancelMount':
      'การเปิดดิสก์เสมือนจะยกเลิกการเมานต์อิมเมจ ดำเนินการต่อหรือไม่?',
    'screen.transferRunningTitle': 'กำลังถ่ายโอนอิมเมจ',
    'screen.transferRunningDesc':
      'การเปลี่ยนโหมดวิดีโอจะโหลดหน้าใหม่ ซึ่งจะยกเลิกการอัปโหลดหรือดาวน์โหลดอิมเมจที่กำลังดำเนินอยู่',
    'screen.transferRunningOk': 'เปลี่ยนโหมด',
    'settings.device.diskTransferRunning':
      'กำลังถ่ายโอนอิมเมจอยู่ โปรดรอให้เสร็จก่อนเปิดใช้งานดิสก์เสมือน',
    'settings.update.previewChannels': 'ควบคุมช่องทางตัวอย่างทั้งของแอปพลิเคชันและระบบ',
    'settings.update.system.appUpdateRequired':
      'อัปเดตแอปพลิเคชันเป็น {{version}} ก่อนติดตั้งการอัปเดตระบบนี้',
    'settings.update.system.requiredAppVersion': 'เวอร์ชันแอปพลิเคชันที่จำเป็น',
    'settings.system.firewall.enableHttpsFirst':
      'เปิดใช้งาน HTTPS ก่อนเปิดโหมดไฟร์วอลล์ จำกัด หรือ หวาดระแวง',
    'settings.system.firewall.httpsRequired':
      'โหมด จำกัด และ หวาดระแวง จะถูกปิดใช้งานจนกว่าจะเปิด HTTPS ที่ การตั้งค่า > ระบบ > เครือข่าย',
    'settings.system.firewall.mode.baselineDesc':
      'โปรไฟล์แบบเปิดเพื่อความเข้ากันได้ ไฟร์วอลล์ทำงานอยู่ แต่ไม่จำกัดแหล่งที่มาขาเข้า ใช้เฉพาะในเครือข่ายที่เชื่อถือได้เท่านั้น',
    'settings.system.firewall.mode.moderateDesc':
      'โปรไฟล์เริ่มต้น คงบริการของ พื้นฐาน ไว้ แต่รับการเชื่อมต่อขาเข้าใหม่จากช่วงส่วนตัว, link-local หรือ loopback เท่านั้น การเข้าถึงขาออกยังคงเปิดอยู่',
    'settings.system.firewall.mode.paranoidDesc':
      'เข้าถึง HTTPS ได้เฉพาะภายในเครื่อง บล็อก SSH, HTTP, การอัปเดตออนไลน์ และฟีเจอร์เครือข่ายขาออกอื่น ๆ การอัปโหลดอัปเดตแบบออฟไลน์และการติดตั้งที่เตรียมไว้แล้วยังใช้งานได้',
    'settings.system.firewall.mode.current': 'ปัจจุบัน',
    'settings.system.firewall.mode.default': 'ค่าเริ่มต้น',
    'settings.system.firewall.mode.localOnly': 'เฉพาะภายในเครื่อง',
    'settings.system.firewall.mode.openTag': 'ขาเข้าเปิด',
    'settings.system.firewall.mode.httpsRequiredTag': 'ต้องใช้ HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'ขาออกเปิด',
    'settings.system.firewall.mode.outboundLimited': 'ขาออกจำกัด',
    'settings.system.firewall.mode.httpsOnly': 'เฉพาะ HTTPS',
    'settings.system.firewall.moderate.apply': 'สลับไปใช้ ปานกลาง',
    'settings.system.firewall.baseline.apply': 'สลับไปใช้ พื้นฐาน',
    'settings.system.firewall.baseline.confirmTitle': 'สลับไปใช้โหมด พื้นฐาน แบบเปิดหรือไม่?',
    'settings.system.firewall.baseline.confirmDesc':
      'บริการไฟร์วอลล์ยังคงทำงานอยู่ แต่จะยกเลิกข้อจำกัดเฉพาะช่วงต้นทางภายในเครื่อง ช่วงต้นทางสาธารณะอาจเข้าถึงบริการ NanoKVM ที่เปิดอยู่ได้หากเครือข่ายส่งต่อให้',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC ถูกปิดใช้งานในโหมดไฟร์วอลล์ จำกัด และ หวาดระแวง',
    'settings.system.firewall.mode.baseline': 'พื้นฐาน',
    'settings.system.firewall.mode.moderate': 'ปานกลาง',
    'settings.system.firewall.mode.restricted': 'จำกัด',
    'settings.system.firewall.mode.paranoid': 'หวาดระแวง',
    'settings.system.firewall.restricted.enable': 'เปิด จำกัด',
    'settings.system.firewall.restricted.confirmTitle': 'เปิดโหมด จำกัด หรือไม่?',
    'settings.system.firewall.paranoid.enable': 'เปิด หวาดระแวง',
    'settings.system.firewall.paranoid.confirmTitle': 'เปิดโหมด หวาดระแวง หรือไม่?',
    'settings.update.paranoidBlocked': 'การอัปเดตออนไลน์ถูกบล็อกโดยโหมดไฟร์วอลล์ หวาดระแวง',
    'settings.device.hidOnlyDesc':
      'ช่วยให้ทำงานร่วมกับโฮสต์ได้ดีขึ้น หากเมาส์หรือคีย์บอร์ดไม่ตอบสนอง',
    'mouse.hidOnly.desc':
      'หากเมาส์หรือคีย์บอร์ดไม่ตอบสนองและการรีเซ็ต HID ไม่ช่วย อาจเป็นปัญหาความเข้ากันได้ระหว่าง NanoKVM กับโฮสต์',
    'settings.device.hidOnlyTip':
      'โหมด HID-Only จะหยุดจำลองอุปกรณ์เสมือนและคงไว้เพียงการควบคุม HID พื้นฐาน',
    'keyboard.shortcut.captureTips':
      'การจับปุ่มระดับระบบ เช่น ปุ่ม Windows ต้องได้รับสิทธิ์โหมดเต็มหน้าจอ',
    'settings.device.diskLocked': 'ปิดอยู่ขณะเมานต์อิมเมจ และการเปิดจะยกเลิกการเมานต์',
    'image.tips.usb2':
      'ตรวจสอบให้แน่ใจว่าได้เปิดใช้งานดิสก์เสมือนแล้วใน การตั้งค่า > อุปกรณ์ > ดิสก์จำลอง',
    'image.tips.tf2': 'นำการ์ด TF ออกจาก NanoKVM สำหรับรุ่น FULL ให้แกะเคสออกก่อน',
    'auth.tips.change3': 'รหัสผ่าน root ของระบบสำหรับเข้าสู่ระบบ SSH',
    'download.sha256': 'ค่าตรวจสอบ SHA-256 แบบไม่บังคับ',
    'power.powerShort': 'ปุ่มเปิด/ปิด: กดปล่อย',
    'power.powerLong': 'ปุ่มเปิด/ปิด: กดค้าง',
    'settings.tailscale.notInstall': 'ไม่พบ Tailscale กรุณาติดตั้ง',
    'settings.tailscale.retry': 'กรุณารีเฟรชและลองใหม่ หรือติดตั้งด้วยตนเอง',
    'wifi.failed': 'เกิดข้อผิดพลาด กรุณาลองใหม่',
    'image.mountDesc': 'ในบางระบบ, จะต้อง eject ดิสก์จำลองก่อนที่จะใส่ดิสก์ใหม่',
    'settings.device.swap.tip': 'การเปิดใช้งานคุณลักษณะนี้อาจทำให้อายุการใช้งานของการ์ด SD สั้นลง',
    'settings.update.previewTip':
      'โปรดทราบว่าการเผยแพร่ตัวอย่างอาจมีข้อบกพร่องหรือฟังก์ชันการทำงานที่ไม่สมบูรณ์',
    'auth.changePasswordDesc': 'เพื่อความปลอดภัย, โปรดเปลี่ยนรหัสผ่าน',
    'settings.network.dns.manualServersDescription': 'รองรับเซิร์ฟเวอร์ทั้ง IPv4 และ IPv6',
    'settings.tailscale.stopDesc': 'ออกจากระบบและปิดการเริ่มอัตโนมัติ',
    'keyboard.dropdownFrench': 'ภาษาฝรั่งเศส',
    'keyboard.dropdownGerman': 'ภาษาเยอรมัน',
    'keyboard.dropdownRussian': 'ภาษารัสเซีย',
    'keyboard.dropdownKorean': 'ภาษาเกาหลี',
    'keyboard.dropdownJapanese': 'ภาษาญี่ปุ่น',
    'keyboard.localInput': 'การป้อนข้อมูลจากแป้นพิมพ์มือถือ',
    'settings.network.configuration': 'การกำหนดค่า',
    'settings.network.dns.servers': 'เซิร์ฟเวอร์',
    'settings.system.time.servers.description':
      'ใช้เซิร์ฟเวอร์สาธารณะเริ่มต้น เราเตอร์ในเครือข่ายของคุณ หรือเซิร์ฟเวอร์ NTP ที่กำหนดเอง',
    'settings.system.firewall.mode.restrictedDesc':
      'HTTPS และ SSH เฉพาะภายในเครื่อง รวมถึง DNS, NTP, syslog และการอัปเดตออนไลน์ขาออก DHCP และทราฟฟิก IPv6 ที่จำเป็นยังใช้งานได้ WebRTC ถูกบล็อก',
    'settings.system.firewall.backends': 'แบ็กเอนด์',
    'settings.system.firewall.restricted.confirmDesc':
      'การเข้าถึงผู้ดูแลขาเข้าจะถูกจำกัดไว้ที่ช่วง private IPv4, IPv4 link-local/loopback, IPv6 link-local หรือ IPv6 loopback สำหรับ HTTPS และ SSH ไม่อนุญาตช่วงต้นทางสาธารณะ DNS, NTP, syslog ระยะไกล, อัปเดตออนไลน์, DHCP, การเชื่อมต่อที่สร้างแล้ว และทราฟฟิกควบคุม IPv6 ที่จำเป็นขาออกจะยังใช้งานได้ WebRTC/ICE UDP และทราฟฟิกขาเข้า/ขาออกอื่นจะถูกบล็อก',
    'settings.system.firewall.paranoid.confirmDesc':
      'จะเหลือเฉพาะการเข้าถึง HTTPS จากช่วง private IPv4, IPv4 link-local/loopback, IPv6 link-local หรือ IPv6 loopback เท่านั้น SSH, HTTP, mDNS, NTP, การดาวน์โหลด GitHub และทราฟฟิกอื่นจะถูกบล็อก ยกเว้น DHCP/การควบคุม IPv6 ขั้นต่ำ',
    'settings.system.sections.systemLog': 'การบันทึกล็อก',
    'settings.systemLog.remote.title': 'การบันทึกล็อกระยะไกล',
    'settings.systemLog.remote.forward': 'ส่งต่อบันทึกระบบ',
    'settings.systemLog.remote.description': 'ส่งต่อข้อความระบบไปยังเซิร์ฟเวอร์ระยะไกล',
    'settings.systemLog.kernel.title': 'การบันทึกล็อก Kernel',
    'settings.systemLog.local.title': 'บัฟเฟอร์บันทึกระบบ',
    'settings.systemLog.remote.hostDesc': 'ชื่อโฮสต์หรือที่อยู่ IPv4 ของเซิร์ฟเวอร์ syslog',
    'settings.systemLog.kernel.enabledDesc': 'เก็บข้อความ kernel ไว้ในบันทึกระบบ',
    'settings.systemLog.kernel.consoleLevelDesc':
      'ระดับความเร่งด่วนขั้นต่ำของข้อความ kernel ที่จะแสดงบนคอนโซล',
    'settings.systemLog.local.priorityDesc': 'ระดับความเร่งด่วนขั้นต่ำของข้อความที่จะถูกบันทึก',
    'settings.systemLog.local.bufferDesc': 'ขนาดบันทึกที่จะหมุนเวียนไฟล์',
    'settings.systemLog.local.rotationsDesc': 'จำนวนไฟล์บันทึกที่หมุนเวียนแล้วซึ่งเก็บไว้',
    'settings.systemLog.local.compactDesc': 'ตัดชื่อโฮสต์และ facility ออกจากแต่ละบรรทัด',
    'settings.systemLog.local.stripTimestampsDesc':
      'ลบการประทับเวลาที่ผู้ส่งเพิ่มเข้ามา โดย syslog จะเพิ่มของตัวเอง',
    'settings.systemLog.local.description':
      'บันทึกปัจจุบันถูกเก็บไว้ใน RAM ที่ {{path}} เพื่อหลีกเลี่ยงการเขียนลงการ์ด SD',
    'settings.systemLog.kernel.enabled': 'ส่งต่อบันทึก kernel',
    'settings.device.swap.size': 'ขนาด Swap',
    'settings.device.swap.description': 'ใช้ไฟล์สลับเมื่อหน่วยความจำเหลือน้อย',
    'settings.device.swap.sizeDescription': 'กำหนดขนาดไฟล์สลับ',
    'settings.device.sections.connectivity': 'การเชื่อมต่อ',
    'settings.device.sections.hostConnection': 'การเชื่อมต่อกับโฮสต์',
    'settings.device.sections.inputOutput': 'อินพุตและเอาต์พุต',
    'settings.device.sections.optimizations': 'การปรับให้เหมาะสม',
    'settings.device.minutes': 'นาที',
    'settings.device.oled.title': 'หมดเวลา OLED',
    'settings.device.oled.keepOn': 'เปิด OLED ไว้ตลอด',
    'settings.device.oled.keepOnDescription': 'ไม่ปิดหน้าจอ OLED เลย',
    'settings.device.sessionLock.title': 'ล็อกเซสชันเมื่อไม่มีการใช้งาน'
  },
  tr: {
    'auth.illegalPassword':
      'Şifre en az 8 karakter olmalı ve tırnak işareti veya eğik çizgi içermemelidir',
    'screen.videoDirectTips':
      'Bu modu kullanmak için "Ayarlar > Sistem > Ağ" bölümünde HTTPS\'i etkinleştirin',
    'download.disabled':
      'Depolama yazılabilir olmadığı için şu anda imaj indirilemiyor veya yüklenemiyor. Bir imaj bağlıysa bağlantısını kaldırın, ardından depolamayı yeniden yazılabilir yapmak için sanal diski kapatın.',
    'auth.placeholderPassword2': 'Şifrenizi tekrar girin',
    'image.mountFailed': 'Bağlama başarısız oldu',
    'image.unmountFailed': 'Bağlantıyı kaldırma başarısız oldu',
    'settings.tailscale.install': 'Yükle',
    'settings.tailscale.installing': 'Yükleniyor',
    'settings.tailscale.failed': 'Yükleme başarısız oldu',
    'settings.tailscale.notInstall': 'Tailscale bulunamadı. Lütfen yükleyin.',
    'settings.tailscale.retry':
      'Lütfen sayfayı yenileyin ve tekrar deneyin ya da manuel olarak yükleyin.',
    'settings.tailscale.urlPeriod': 'Adres sadece 10 dakika boyunca geçerlidir',
    'settings.device.hdmi.description': 'HDMI/Monitör çıktısını aktifleştir',
    'settings.account.logoutBtn': 'Çıkış yap',
    'settings.device.diskDesc': 'SD kartı uzak ana bilgisayara bağla',
    'settings.device.diskCancelMount':
      'Sanal diski etkinleştirmek bağlı imajı iptal eder. Devam edilsin mi?',
    'wifi.success': "NanoKVM'in ağ durumunu kontrol etmek için cihazın başına gidin",
    'settings.device.oled.description': 'OLED ekranı şu süreden sonra kapat',
    'screen.transferRunningTitle': 'İmaj aktarımı sürüyor',
    'screen.transferRunningDesc':
      'Video modunu değiştirmek sayfayı yeniden yükler ve devam eden imaj yükleme veya indirme işlemini iptal eder.',
    'screen.transferRunningOk': 'Modu değiştir',
    'settings.device.diskTransferRunning':
      'Bir imaj aktarımı sürüyor. Sanal diski etkinleştirmeden önce bitmesini bekleyin.',
    'settings.update.previewChannels':
      'Hem uygulamanın hem de sistemin önizleme kanallarını denetler',
    'settings.update.system.appUpdateRequired':
      'Bu sistem güncellemesini yüklemeden önce uygulamayı {{version}} sürümüne güncelleyin',
    'settings.update.system.requiredAppVersion': 'Gerekli uygulama sürümü',
    'settings.system.firewall.enableHttpsFirst':
      "Kısıtlı veya Paranoyak güvenlik duvarı modunu etkinleştirmeden önce HTTPS'i etkinleştirin",
    'settings.system.firewall.httpsRequired':
      'Kısıtlı ve Paranoyak modları, HTTPS Ayarlar > Sistem > Ağ bölümünde etkinleştirilene kadar devre dışıdır',
    'settings.system.firewall.mode.baselineDesc':
      'Açık uyumluluk profili. Güvenlik duvarı çalışır, ancak gelen kaynaklar kısıtlanmaz. Yalnızca güvenilir ağlarda kullanın.',
    'settings.system.firewall.mode.moderateDesc':
      'Varsayılan profil. Temel mod hizmetlerini korur, ancak yeni gelen bağlantıları yalnızca özel, link-local veya loopback aralıklarından kabul eder. Giden erişim açık kalır.',
    'settings.system.firewall.mode.paranoidDesc':
      'Yalnızca yerel HTTPS erişimi. SSH, HTTP, çevrimiçi güncellemeleri ve diğer giden ağ özelliklerini engeller. Çevrimdışı güncelleme yükleme ve önceden hazırlanmış kurulumlar kullanılabilir kalır.',
    'settings.system.firewall.mode.current': 'Geçerli',
    'settings.system.firewall.mode.default': 'Varsayılan',
    'settings.system.firewall.mode.localOnly': 'Yalnızca yerel',
    'settings.system.firewall.mode.openTag': 'Gelen açık',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS gerekli',
    'settings.system.firewall.mode.outboundOpen': 'Giden açık',
    'settings.system.firewall.mode.outboundLimited': 'Giden sınırlı',
    'settings.system.firewall.mode.httpsOnly': 'Yalnızca HTTPS',
    'settings.system.firewall.moderate.apply': 'Orta moda geç',
    'settings.system.firewall.baseline.apply': 'Temel moda geç',
    'settings.system.firewall.baseline.confirmTitle': 'Açık Temel moduna geçilsin mi?',
    'settings.system.firewall.baseline.confirmDesc':
      "Güvenlik duvarı hizmeti etkin kalır, ancak yalnızca yerel kaynak aralığı kısıtlaması kaldırılır. Ağ yönlendiriyorsa genel kaynak aralıkları NanoKVM'in açıkta kalan hizmetlerine ulaşabilir.",
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC, Kısıtlı ve Paranoyak güvenlik duvarı modlarında devre dışıdır',
    'settings.system.firewall.mode.baseline': 'Temel',
    'settings.system.firewall.mode.moderate': 'Orta',
    'settings.system.firewall.mode.restricted': 'Kısıtlı',
    'settings.system.firewall.mode.paranoid': 'Paranoyak',
    'settings.system.firewall.restricted.enable': 'Kısıtlı modu etkinleştir',
    'settings.system.firewall.restricted.confirmTitle': 'Kısıtlı modu etkinleştirilsin mi?',
    'settings.system.firewall.paranoid.enable': 'Paranoyak modu etkinleştir',
    'settings.system.firewall.paranoid.confirmTitle': 'Paranoyak modu etkinleştirilsin mi?',
    'settings.update.paranoidBlocked':
      'Çevrimiçi güncellemeler Paranoyak güvenlik duvarı modu tarafından engellenir',
    'settings.device.hidOnlyDesc':
      'Fare veya klavye yanıt vermeyi bırakırsa ana bilgisayarla uyumluluğu artırır',
    'mouse.hidOnly.desc':
      "Fare veya klavye yanıt vermeyi bırakır ve HID'i sıfırlamak yardımcı olmazsa, NanoKVM ile ana bilgisayar arasında bir uyumluluk sorunu olabilir.",
    'settings.device.hidOnlyTip':
      'HID-Only modu sanal aygıtları taklit etmeyi durdurur ve yalnızca temel HID kontrolünü korur',
    'settings.device.ssh.tip':
      'Bu seçeneği etkinleştirmeden önce Hesap > Şifre bölümünde güçlü bir şifre belirleyin',
    'keyboard.shortcut.captureTips':
      'Windows tuşu gibi sistem düzeyi tuşları yakalamak için tam ekran izni gerekir',
    'settings.device.diskLocked': 'Bir imaj bağlıyken kapalı, açmak ise bağlamayı iptal eder',
    'image.tips.usb2':
      'Sanal diskin Ayarlar > Cihaz > Sanal Disk bölümünde bağlı olduğundan emin olun.',
    'image.tips.tf2': "NanoKVM'den TF kartı çıkarın. FULL sürümde önce kutuyu sökün.",
    'auth.tips.change3': 'SSH girişi için root sistem şifresi',
    'download.sha256': 'İsteğe bağlı SHA-256 sağlama toplamı',
    'power.powerShort': 'Güç düğmesi: bas-çek',
    'power.powerLong': 'Güç düğmesi: uzun bas',
    'wifi.failed': 'İşlem başarısız oldu, lütfen tekrar deneyiniz',
    'screen.webrtcConnectionFailed.description':
      'Ağ bağlantısını kontrol edin veya video modunu değiştirin',
    'keyboard.shortcut.enterFullScreen': 'Tam ekran moduna geçiş yapın',
    'keyboard.leaderKey.desc':
      'Tarayıcı kısıtlamalarını atlayın ve sistem kısayollarını doğrudan uzak ana bilgisayara gönderin',
    'image.mountDesc':
      'Bazı sistemlerde, disk imajını bağlamadan önce uzak ana bilgisayardaki sanal diski çıkarmak gerekir',
    'image.unmountDesc':
      'Bazı sistemlerde, görüntünün bağlantısını kesmeden önce uzak ana bilgisayardan manuel olarak çıkarmanız gerekir',
    'auth.totp.prompt': 'Kimlik doğrulama uygulamanızdaki 6 haneli kodu girin',
    'auth.totp.backupPrompt': 'Yedek kodlarınızdan birini girin',
    'auth.setupRecovery': 'Bu parola kaybolursa kurtarma için SD kartın yeniden yazılması gerekir',
    'download.diskShared': 'Önce sanal diski kapatın, sonra imaj indirmeyi kullanın',
    'download.remoteDisabled': 'Uzak ISO indirme Ayarlar > Görünüm içinde devre dışı',
    'settings.device.usbWakeupDesc':
      'Klavye veya fare olaylarının uzak makineyi uyandırmasına izin verir',
    'settings.device.usbWakeupTip': 'Makine tekrarlayan USB wakeup iletileri kaydediyorsa kapatın',
    'settings.network.tls.tip':
      'HTTPS protokolü bağlantıda gecikmeye sebep olabilir, özellikle MJPEG görüntü modu ile',
    'settings.system.time.servers.description':
      'Varsayılan genel sunucuları, yerel yönlendiricinizi veya özel NTP sunucularını kullanın',
    'settings.systemLog.remote.protocol': 'Geçerli BusyBox syslogd UDP syslog kullanır',
    'settings.systemLog.viewer.truncated': 'Yalnızca en son günlük verileri gösterilir',
    'settings.update.system.rawEnableDesc':
      'Doğrulanmış raw boot/rootfs imajlarının bu ekrandan SD karta yazılmasına izin verir',
    'settings.account.totp.description':
      'Şifrenize ek olarak bir kimlik doğrulama uygulamasından zamana dayalı kod iste',
    'settings.account.totp.requireDescription':
      'Açıkken iki adımlı doğrulama devre dışı bırakılamaz ve bu özelliği olmayan bir hesabın cihazı kullanmadan önce kurması gerekir',
    'picoclaw.empty': 'Paneli açın ve başlamak için bir görevi başlatın',
    'picoclaw.agent.defaultDescription': 'Genel sohbet, arama ve çalışma alanı yardımı',
    'picoclaw.agent.kvmDescription': 'Uzak ana bilgisayarı NanoKVM aracılığıyla çalıştırın',
    'picoclaw.install.uninstalled': 'Runtime başarıyla kaldırıldı',
    'picoclaw.install.uninstallFailed': 'Kaldırma başarısız oldu',
    'settings.device.swap.tip':
      'Bu özelliği aktifleştirmek micro SD kartınızın ömrünü kısaltabilir',
    'settings.update.previewTip':
      'Ön izleme güncellemelerinin tamamlanmamış olduğunu ve sorunlara sebep olabileceğini unutmayın',
    'auth.changePasswordDesc': 'Güvenlik sebebiyle lütfen şifrenizi değiştiriniz',
    'settings.network.dns.manualServersDescription': 'IPv4 ve IPv6 sunucuları desteklenir',
    'error.title': 'Bir hata oluştu',
    'wol.title': 'Ağ Üzerinden Uyandırma',
    'settings.device.ssh.description': 'SSH uzaktan erişimini etkinleştir',
    'settings.tailscale.stopDesc': 'Çıkış yap ve otomatik başlatmayı kapat.',
    'keyboard.tips': 'Sadece standart klavye harfleri ve sembolleri desteklenmektedir',
    'image.tips.tf1': 'Bu yöntem Linux sistemlerde desteklenmektedir',
    'terminal.unlockDesc': 'Terminal oturumu başlatmak için web hesabı parolanızı girin',
    'terminal.locked': 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin',
    'keyboard.dropdownKorean': 'Korece',
    'keyboard.dropdownJapanese': 'Japonca',
    'image.tips.scp2':
      "Bilgisayarınızda uçbirimi açın ve disk imajı dosyanızı SCP komutunu kullanarak NanoKVM'in /data dizinine yükleyin.",
    'image.tips.scp3': 'Örnek: scp disk-imajı-yolu root@nanokvm-ip:/data',
    'image.tips.tf4': 'Disk imajı dosyanızı micro SD kartın /data dizinine kopyalayın.',
    'script.delDesc': 'Bu dosyayı silmek istediğinizden emin misiniz?',
    'keyboard.localInput': 'Mobil klavye girişi',
    'settings.network.configuration': 'Yapılandırma',
    'settings.network.dns.servers': 'Sunucular',
    'settings.system.firewall.mode.restrictedDesc':
      'Yalnızca yerel HTTPS ve SSH ile giden DNS, NTP, syslog ve çevrimiçi güncellemeler. DHCP ve temel IPv6 trafiği kullanılabilir kalır. WebRTC engellenir.',
    'settings.system.firewall.backends': "Backend'ler",
    'settings.system.firewall.restricted.confirmDesc':
      'Gelen yönetim erişimi HTTPS ve SSH için private IPv4, IPv4 link-local/loopback, IPv6 link-local veya IPv6 loopback kaynak aralıklarıyla sınırlanır. Genel kaynak aralıklarına izin verilmez. Giden DNS, NTP, uzak syslog, çevrimiçi güncellemeler, DHCP, kurulmuş bağlantılar ve gerekli IPv6 kontrol trafiği kullanılabilir kalır. WebRTC/ICE UDP ve diğer gelen/giden trafik engellenir.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Yalnızca private IPv4, IPv4 link-local/loopback, IPv6 link-local veya IPv6 loopback kaynak aralıklarından HTTPS erişimi kullanılabilir kalır. SSH, HTTP, mDNS, NTP, GitHub indirmeleri ve diğer trafik minimal DHCP/IPv6 kontrolü dışında engellenir.',
    'settings.system.sections.systemLog': 'Günlük kaydı',
    'settings.systemLog.remote.title': 'Uzak günlük kaydı',
    'settings.systemLog.remote.forward': 'Sistem günlüğünü ilet',
    'settings.systemLog.remote.description': 'Sistem iletilerini uzak bir sunucuya ilet',
    'settings.systemLog.kernel.title': 'Kernel günlük kaydı',
    'settings.systemLog.local.title': 'Sistem günlüğü tamponu',
    'settings.systemLog.remote.hostDesc': 'Syslog sunucusunun ana bilgisayar adı veya IPv4 adresi',
    'settings.systemLog.kernel.enabledDesc': 'Kernel iletilerini sistem günlüğüne kaydet',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Bir kernel iletisinin konsola yazdırılması için en düşük aciliyet',
    'settings.systemLog.local.priorityDesc':
      'Bir iletinin günlüğe kaydedilmesi için en düşük aciliyet',
    'settings.systemLog.local.bufferDesc': 'Dosyanın döndürüldüğü günlük boyutu',
    'settings.systemLog.local.rotationsDesc': 'Saklanan döndürülmüş günlük dosyalarının sayısı',
    'settings.systemLog.local.compactDesc':
      'Her satırdan ana bilgisayar adını ve facility değerini çıkar',
    'settings.systemLog.local.stripTimestampsDesc':
      'Gönderenin eklediği zaman damgalarını kaldır; syslog kendisininkini ekler',
    'settings.systemLog.local.description':
      'SD karta yazmayı önlemek için geçerli günlükler RAM’de {{path}} konumunda tutulur',
    'settings.systemLog.kernel.enabled': 'Kernel günlüğünü ilet',
    'settings.device.swap.size': 'Swap boyutu',
    'settings.device.swap.description': 'Bellek azaldığında bir swap dosyası kullan',
    'settings.device.swap.sizeDescription': 'Swap dosyasının boyutunu belirle',
    'settings.device.sections.connectivity': 'Bağlantı',
    'settings.device.sections.hostConnection': 'Ana makine bağlantısı',
    'settings.device.sections.inputOutput': 'Giriş ve çıkış',
    'settings.device.sections.optimizations': 'Optimizasyonlar',
    'settings.device.minutes': 'dk',
    'settings.device.oled.title': 'OLED zaman aşımı',
    'settings.device.oled.keepOn': "OLED'i açık tut",
    'settings.device.oled.keepOnDescription': 'OLED ekranı hiç kapatma',
    'settings.device.sessionLock.title': 'Etkin değilken oturumu kilitle'
  },
  uk: {
    'auth.illegalPassword':
      'Пароль має містити щонайменше 8 символів і не може містити лапок чи похилих рисок',
    'screen.videoDirectTips':
      'Увімкніть HTTPS у "Налаштування > Система > Мережа", щоб використовувати цей режим',
    'download.disabled':
      'Зараз не можна завантажувати чи вивантажувати образи, бо сховище недоступне для запису. Якщо образ змонтовано, розмонтуйте його, а потім вимкніть віртуальний диск, щоб сховище знову стало доступним для запису.',
    'keyboard.shortcut.clear': 'Очистити',
    'keyboard.shortcut.custom': 'Власні',
    'keyboard.shortcut.title': 'Комбінації клавіш',
    'wol.sending': 'Надсилання команди...',
    'image.mountFailed': 'Не вдалося змонтувати образ',
    'auth.error': 'Непередбачена помилка',
    'settings.network.wifi.confirmBtn': 'ОК',
    'settings.device.mouseJiggler.title': 'Імітація руху миші',
    'settings.device.mouseJiggler.disable': 'Вимкнути',
    'settings.device.mdns.description': 'Увімкнути службу виявлення mDNS',
    'settings.update.preview': 'Попередні оновлення',
    'settings.account.webAccount': "Ім'я облікового запису у веб-інтерфейсі",
    'settings.tailscale.run': 'Запустити',
    'power.powerConfirm': 'Виконати операцію живлення?',
    'fullscreen.toggle': 'Перемкнути повноекранний режим',
    'settings.device.diskDesc': 'Змонтувати SD-карту на віддаленому хості',
    'settings.device.diskCancelMount':
      'Увімкнення віртуального диска скасує змонтований образ. Продовжити?',
    'screen.transferRunningTitle': 'Триває передавання образу',
    'screen.transferRunningDesc':
      'Зміна відеорежиму перезавантажує сторінку й скасовує поточне вивантаження або завантаження образу.',
    'screen.transferRunningOk': 'Змінити режим',
    'settings.device.diskTransferRunning':
      'Триває передавання образу. Дочекайтеся його завершення, перш ніж вмикати віртуальний диск.',
    'settings.update.previewChannels':
      'Керує каналами попереднього перегляду і застосунку, і системи',
    'settings.update.system.appUpdateRequired':
      'Оновіть застосунок до {{version}}, перш ніж встановлювати це оновлення системи',
    'settings.update.system.requiredAppVersion': 'Потрібна версія застосунку',
    'settings.system.firewall.enableHttpsFirst':
      'Увімкніть HTTPS, перш ніж вмикати режим брандмауера Обмежений або Параноїдальний',
    'settings.system.firewall.httpsRequired':
      'Режими Обмежений і Параноїдальний вимкнено, доки HTTPS не буде увімкнено в Налаштування > Система > Мережа',
    'settings.system.firewall.mode.baselineDesc':
      'Відкритий профіль сумісності. Брандмауер працює, але вхідні джерела не обмежуються. Використовуйте лише в довірених мережах.',
    'settings.system.firewall.mode.moderateDesc':
      'Типовий профіль. Зберігає служби базового режиму, але приймає нові вхідні підключення лише з приватних діапазонів, link-local або loopback. Вихідний доступ залишається відкритим.',
    'settings.system.firewall.mode.paranoidDesc':
      'Лише локальний доступ HTTPS. Блокує SSH, HTTP, онлайн-оновлення та інші функції вихідної мережі. Завантаження офлайн-оновлень і вже підготовлені встановлення залишаються доступними.',
    'settings.system.firewall.mode.current': 'Поточний',
    'settings.system.firewall.mode.default': 'Типовий',
    'settings.system.firewall.mode.localOnly': 'Лише локально',
    'settings.system.firewall.mode.openTag': 'Вхідні відкриті',
    'settings.system.firewall.mode.httpsRequiredTag': 'Потрібен HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Вихідні відкриті',
    'settings.system.firewall.mode.outboundLimited': 'Вихідні обмежені',
    'settings.system.firewall.mode.httpsOnly': 'Лише HTTPS',
    'settings.system.firewall.moderate.apply': 'Перейти на Помірний',
    'settings.system.firewall.baseline.apply': 'Перейти на Базовий',
    'settings.system.firewall.baseline.confirmTitle': 'Перейти на відкритий режим Базовий?',
    'settings.system.firewall.baseline.confirmDesc':
      'Служба брандмауера залишається активною, але обмеження лише локальними діапазонами джерел знімається. Публічні діапазони джерел можуть досягти відкритих служб NanoKVM, якщо мережа їх маршрутизує.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC вимкнено в режимах firewall Обмежений і Параноїдальний',
    'settings.system.firewall.mode.baseline': 'Базовий',
    'settings.system.firewall.mode.moderate': 'Помірний',
    'settings.system.firewall.mode.restricted': 'Обмежений',
    'settings.system.firewall.mode.paranoid': 'Параноїдальний',
    'settings.system.firewall.restricted.enable': 'Увімкнути Обмежений',
    'settings.system.firewall.restricted.confirmTitle': 'Увімкнути режим Обмежений?',
    'settings.system.firewall.paranoid.enable': 'Увімкнути Параноїдальний',
    'settings.system.firewall.paranoid.confirmTitle': 'Увімкнути режим Параноїдальний?',
    'settings.update.paranoidBlocked':
      'Онлайн-оновлення заблоковані режимом брандмауера Параноїдальний',
    'settings.device.hidOnlyDesc':
      'Покращує сумісність із хостом, якщо миша або клавіатура перестали відповідати',
    'mouse.hidOnly.desc':
      'Якщо миша або клавіатура перестали відповідати, а скидання HID не допомагає, це може бути проблема сумісності між NanoKVM і хостом.',
    'settings.device.hidOnlyTip':
      'Режим HID-Only припиняє емуляцію віртуальних пристроїв і зберігає лише базове керування HID',
    'settings.device.ssh.tip':
      'Перед увімкненням цього параметра встановіть надійний пароль у розділі Обліковий запис > Пароль',
    'keyboard.shortcut.captureTips':
      'Для захоплення системних клавіш, наприклад клавіші Windows, потрібен дозвіл повноекранного режиму',
    'settings.device.diskLocked': 'Вимкнено, поки змонтовано образ, а увімкнення скасує монтування',
    'image.tips.usb2':
      'Переконайтеся, що віртуальний диск змонтовано в розділі Налаштування > Пристрій > Віртуальний диск.',
    'image.tips.tf2': 'Дістаньте TF-карту з NanoKVM. У версії FULL спочатку розберіть корпус.',
    'auth.tips.change3': 'Системний пароль root для входу по SSH',
    'download.sha256': 'Необов’язкова контрольна сума SHA-256',
    'power.powerShort': 'Кнопка живлення: коротке натискання',
    'power.powerLong': 'Кнопка живлення: довге натискання',
    'settings.tailscale.notInstall': 'Tailscale не знайдено. Будь ласка, встановіть його.',
    'settings.tailscale.retry':
      'Будь ласка, оновіть сторінку та спробуйте ще раз або встановіть вручну.',
    'wifi.success': 'Перейдіть до пристрою та перевірте стан мережі NanoKVM',
    'wifi.failed': 'Операція не вдалася, спробуйте ще раз',
    'screen.webrtcConnectionFailed.description':
      'Перевірте мережеве з’єднання або змініть режим відео',
    'keyboard.shortcut.enterFullScreen': 'Перемкнути повноекранний режим',
    'keyboard.leaderKey.desc':
      'Обійти обмеження браузера та надсилати системні ярлики безпосередньо на віддалений хост',
    'image.mountDesc':
      'У деяких системах необхідно витягнути віртуальний диск на віддаленому хості перед монтуванням файлу образа',
    'image.unmountDesc':
      'У деяких системах вам потрібно вручну вийти з віддаленого хоста перед демонтуванням образу',
    'auth.totp.prompt': 'Введіть 6-значний код із застосунку-автентифікатора',
    'auth.totp.backupPrompt': 'Введіть один зі своїх резервних кодів',
    'auth.setupRecovery':
      'Якщо цей пароль буде втрачено, для відновлення потрібно повторно записати SD-карту',
    'download.diskShared':
      'Спочатку вимкніть віртуальний диск, а потім скористайтеся завантаженням образів',
    'download.remoteDisabled': 'Віддалене завантаження ISO вимкнено в Налаштування > Вигляд',
    'settings.device.usbWakeupDesc':
      'Дозволяє подіям клавіатури або миші пробуджувати віддалений хост',
    'settings.device.usbWakeupTip':
      'Вимкніть, якщо хост записує повторювані повідомлення USB wakeup',
    'settings.network.tls.tip':
      'Будьте в курсі: Використання HTTPS може збільшити затримку, особливо в режимі відео MJPEG',
    'settings.system.time.servers.description':
      'Використовуйте публічні сервери за замовчуванням, локальний маршрутизатор або власні NTP-сервери',
    'settings.systemLog.remote.protocol': 'Поточний BusyBox syslogd використовує UDP syslog',
    'settings.systemLog.viewer.truncated': 'Показано лише найновіші дані журналу',
    'settings.update.system.rawEnableDesc':
      'Дозволяє записувати перевірені raw-образи boot/rootfs на SD-карту з цього екрана',
    'settings.account.totp.description':
      'Вимагати, окрім пароля, одноразовий код із застосунку-автентифікатора',
    'settings.account.totp.requireDescription':
      'Поки опцію ввімкнено, двофакторну автентифікацію не можна вимкнути, а обліковий запис без неї має налаштувати її перед використанням пристрою',
    'picoclaw.empty': 'Для початку відкрийте панель і запустіть завдання',
    'picoclaw.agent.defaultDescription': 'Загальна довідка щодо чату, пошуку та робочої області',
    'picoclaw.agent.kvmDescription': 'Керуйте віддаленим хостом через NanoKVM',
    'picoclaw.install.uninstalled': 'Runtime успішно видалено',
    'picoclaw.install.uninstallFailed': 'Помилка видалення',
    'settings.device.swap.tip': 'Увімкнення цієї опції може вивести з ладу SD карту',
    'settings.update.previewTip':
      'Будь ласка, майте на увазі, що випуски бета релізів можуть містити помилки або неповну функціональність',
    'auth.changePasswordDesc':
      'Для безпеки вашого пристрою, будь ласка, змініть пароль для входу в веб-інтерфейс',
    'settings.network.dns.manualServersDescription': 'Підтримуються сервери IPv4 та IPv6',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.stopDesc': 'Вийти та вимкнути автозапуск.',
    'terminal.unlockDesc': 'Введіть пароль вебоблікового запису, щоб почати сеанс термінала',
    'terminal.locked': 'Забагато спроб. Спробуйте пізніше',
    'keyboard.dropdownEnglish': 'Англійська',
    'keyboard.dropdownFrench': 'Французька',
    'keyboard.dropdownGerman': 'Німецька',
    'keyboard.dropdownRussian': 'Російська',
    'keyboard.dropdownKorean': 'Корейська',
    'keyboard.dropdownJapanese': 'Японська',
    'keyboard.localInput': 'Введення з мобільної клавіатури',
    'settings.network.configuration': 'Конфігурація',
    'settings.network.dns.servers': 'Сервери',
    'settings.system.firewall.mode.restrictedDesc':
      'Лише локальні HTTPS і SSH, а також вихідні DNS, NTP, syslog та онлайн-оновлення. DHCP і необхідний трафік IPv6 залишаються доступними. WebRTC заблоковано.',
    'settings.system.firewall.backends': 'Backends',
    'settings.system.firewall.restricted.confirmDesc':
      'Вхідний адміністративний доступ буде обмежено джерелами private IPv4, IPv4 link-local/loopback, IPv6 link-local або IPv6 loopback для HTTPS і SSH. Публічні діапазони джерел не дозволені. Вихідні DNS, NTP, віддалений syslog, онлайн-оновлення, DHCP, встановлені з’єднання та необхідний керівний трафік IPv6 залишаться доступними. WebRTC/ICE UDP та інший вхідний/вихідний трафік буде заблоковано.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Доступним залишиться лише HTTPS із джерел private IPv4, IPv4 link-local/loopback, IPv6 link-local або IPv6 loopback. SSH, HTTP, mDNS, NTP, завантаження з GitHub та інший трафік буде заблоковано, крім мінімального DHCP/керування IPv6.',
    'settings.system.sections.systemLog': 'Журналювання',
    'settings.systemLog.remote.title': 'Віддалене журналювання',
    'settings.systemLog.remote.forward': 'Пересилати системний журнал',
    'settings.systemLog.remote.description':
      'Пересилати системні повідомлення на віддалений сервер',
    'settings.systemLog.kernel.title': 'Журналювання ядра',
    'settings.systemLog.local.title': 'Буфер системного журналу',
    'settings.systemLog.remote.hostDesc': "Ім'я хоста або адреса IPv4 сервера syslog",
    'settings.systemLog.kernel.enabledDesc': 'Записувати повідомлення ядра в системний журнал',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Мінімальна терміновість повідомлення ядра для виводу на консоль',
    'settings.systemLog.local.priorityDesc': 'Мінімальна терміновість повідомлення для запису',
    'settings.systemLog.local.bufferDesc': 'Розмір журналу, за якого файл ротується',
    'settings.systemLog.local.rotationsDesc': 'Кількість збережених ротованих файлів журналу',
    'settings.systemLog.local.compactDesc': "Не включати в кожен рядок ім'я хоста та facility",
    'settings.systemLog.local.stripTimestampsDesc':
      'Видаляти мітки часу, додані відправником; syslog додає власні',
    'settings.systemLog.local.description':
      'Поточні журнали зберігаються в RAM за шляхом {{path}}, щоб уникати записів на SD-карту',
    'settings.systemLog.kernel.enabled': 'Пересилати журнал ядра',
    'settings.device.swap.size': 'Розмір свопу',
    'settings.device.swap.description': "Використовувати файл свопу, коли бракує пам'яті",
    'settings.device.swap.sizeDescription': 'Встановіть розмір файлу свопу',
    'settings.device.sections.connectivity': 'Підключення',
    'settings.device.sections.hostConnection': 'Підключення до хоста',
    'settings.device.sections.inputOutput': 'Введення та виведення',
    'settings.device.sections.optimizations': 'Оптимізація',
    'settings.device.minutes': 'хв',
    'settings.device.oled.title': 'Тайм-аут OLED',
    'settings.device.oled.keepOn': 'Не вимикати OLED',
    'settings.device.oled.keepOnDescription': 'Ніколи не вимикати екран OLED',
    'settings.device.sessionLock.title': 'Блокувати сеанс за бездіяльності'
  },
  vi: {
    'auth.illegalPassword':
      'Mật khẩu phải có ít nhất 8 ký tự và không được chứa dấu nháy hoặc dấu gạch chéo',
    'screen.videoDirectTips': 'Bật HTTPS trong "Cài đặt > Hệ thống > Mạng" để sử dụng chế độ này',
    'download.disabled':
      'Hiện không thể tải xuống hoặc tải lên image vì bộ nhớ không ghi được. Nếu có image đang được gắn, hãy gỡ gắn, rồi tắt đĩa ảo để bộ nhớ ghi được trở lại.',
    'auth.placeholderPassword': 'Vui lòng nhập mật khẩu',
    'auth.placeholderPassword2': 'Vui lòng nhập lại mật khẩu',
    'auth.noEmptyUsername': 'Tên người dùng không được để trống',
    'auth.noEmptyPassword': 'Mật khẩu không được để trống',
    'auth.invalidUser': 'Tên người dùng hoặc mật khẩu không hợp lệ',
    'auth.error': 'Lỗi không mong đợi',
    'auth.differentPassword': 'Mật khẩu không khớp',
    'auth.illegalUsername': 'Tên người dùng chứa ký tự không hợp lệ',
    'mouse.fast': 'Nhanh',
    'keyboard.shortcut.clear': 'Xóa',
    'screen.scale': 'Tỷ lệ',
    'image.unmountFailed': 'Gỡ gắn không thành công',
    'settings.device.oled.description': 'Tắt màn hình OLED sau',
    'screen.transferRunningTitle': 'Đang truyền image',
    'screen.transferRunningDesc':
      'Đổi chế độ video sẽ tải lại trang và hủy việc tải lên hoặc tải xuống image đang chạy.',
    'screen.transferRunningOk': 'Đổi chế độ',
    'settings.device.diskTransferRunning':
      'Đang có một lượt truyền image. Hãy chờ hoàn tất trước khi bật đĩa ảo.',
    'settings.update.previewChannels': 'Điều khiển cả kênh xem trước của ứng dụng lẫn hệ thống',
    'settings.update.system.appUpdateRequired':
      'Hãy cập nhật ứng dụng lên {{version}} trước khi cài đặt bản cập nhật hệ thống này',
    'settings.update.system.requiredAppVersion': 'Phiên bản ứng dụng bắt buộc',
    'settings.device.diskDesc': 'Gắn thẻ SD vào máy chủ từ xa',
    'settings.device.diskCancelMount': 'Bật đĩa ảo sẽ hủy image đang gắn. Tiếp tục?',
    'image.diskOnWarn':
      'Gắn image sẽ tắt đĩa ảo, nên máy tính không còn truy cập được /data. Tiếp tục?',
    'image.diskOffWarn':
      'Đĩa ảo đang tắt và cần được bật để gắn image. Các thiết bị USB trên máy tính sẽ được nhận diện lại. Tiếp tục?',
    'download.diskShared': 'Hãy tắt đĩa ảo trước, rồi dùng tính năng tải image',
    'download.diskOff': 'Tắt đĩa ảo',
    'settings.device.diskLocked': 'Tắt khi đang gắn image, và bật sẽ hủy việc gắn',
    'settings.tailscale.memory.tip':
      'Khi mức dùng bộ nhớ vượt giới hạn, garbage collection sẽ chạy quyết liệt hơn để giải phóng bộ nhớ. Cần khởi động lại Tailscale để thay đổi có hiệu lực.',
    'settings.tailscale.restart': 'Khởi động lại Tailscale?',
    'settings.tailscale.stop': 'Dừng Tailscale?',
    'settings.tailscale.stopDesc': 'Đăng xuất và tắt tự khởi động.',
    'settings.tailscale.okBtn': 'Có',
    'settings.tailscale.cancelBtn': 'Không',
    'wifi.success': 'Hãy đến thiết bị để kiểm tra trạng thái mạng của NanoKVM',
    'settings.system.firewall.enableHttpsFirst':
      'Hãy bật HTTPS trước khi bật chế độ tường lửa Hạn chế hoặc Hoang tưởng',
    'settings.system.firewall.httpsRequired':
      'Các chế độ Hạn chế và Hoang tưởng bị tắt cho đến khi HTTPS được bật trong Cài đặt > Hệ thống > Mạng',
    'settings.system.firewall.mode.baselineDesc':
      'Hồ sơ mở để tương thích. Tường lửa vẫn chạy nhưng không giới hạn nguồn đến. Chỉ dùng trong mạng đáng tin cậy.',
    'settings.system.firewall.mode.moderateDesc':
      'Hồ sơ mặc định. Giữ các dịch vụ của Cơ bản, nhưng chỉ chấp nhận kết nối đến mới từ các dải riêng tư, link-local hoặc loopback. Truy cập đi ra vẫn được mở.',
    'settings.system.firewall.mode.paranoidDesc':
      'Chỉ truy cập HTTPS cục bộ. Chặn SSH, HTTP, cập nhật trực tuyến và các tính năng mạng đi ra khác. Việc tải lên bản cập nhật ngoại tuyến và các bản cài đặt đã chuẩn bị vẫn khả dụng.',
    'settings.system.firewall.mode.current': 'Hiện tại',
    'settings.system.firewall.mode.default': 'Mặc định',
    'settings.system.firewall.mode.localOnly': 'Chỉ cục bộ',
    'settings.system.firewall.mode.openTag': 'Đi vào: mở',
    'settings.system.firewall.mode.httpsRequiredTag': 'Cần HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Đi ra: mở',
    'settings.system.firewall.mode.outboundLimited': 'Đi ra: hạn chế',
    'settings.system.firewall.mode.httpsOnly': 'Chỉ HTTPS',
    'settings.system.firewall.moderate.apply': 'Chuyển sang Vừa phải',
    'settings.system.firewall.baseline.apply': 'Chuyển sang Cơ bản',
    'settings.system.firewall.baseline.confirmTitle': 'Chuyển sang chế độ Cơ bản mở?',
    'settings.system.firewall.baseline.confirmDesc':
      'Dịch vụ tường lửa vẫn hoạt động nhưng bỏ hạn chế chỉ cho dải nguồn cục bộ. Các dải nguồn công khai có thể truy cập các dịch vụ NanoKVM đang mở nếu mạng định tuyến cho chúng.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC bị tắt trong các chế độ tường lửa Hạn chế và Hoang tưởng',
    'settings.system.firewall.mode.baseline': 'Cơ bản',
    'settings.system.firewall.mode.moderate': 'Vừa phải',
    'settings.system.firewall.mode.restricted': 'Hạn chế',
    'settings.system.firewall.mode.paranoid': 'Hoang tưởng',
    'settings.system.firewall.restricted.enable': 'Bật Hạn chế',
    'settings.system.firewall.restricted.confirmTitle': 'Bật chế độ Hạn chế?',
    'settings.system.firewall.paranoid.enable': 'Bật Hoang tưởng',
    'settings.system.firewall.paranoid.confirmTitle': 'Bật chế độ Hoang tưởng?',
    'settings.update.paranoidBlocked': 'Cập nhật online bị chặn bởi chế độ tường lửa Hoang tưởng',
    'settings.device.hidOnlyDesc':
      'Cải thiện khả năng tương thích với máy chủ nếu chuột hoặc bàn phím ngừng phản hồi',
    'mouse.hidOnly.desc':
      'Nếu chuột hoặc bàn phím ngừng phản hồi và việc đặt lại HID không có tác dụng, có thể là sự cố tương thích giữa NanoKVM và máy chủ.',
    'settings.device.hidOnlyTip':
      'Chế độ HID-Only ngừng mô phỏng các thiết bị ảo và chỉ giữ lại điều khiển HID cơ bản',
    'settings.device.ssh.tip':
      'Đặt mật khẩu mạnh trong Tài khoản > Mật khẩu trước khi bật tùy chọn này',
    'keyboard.shortcut.captureTips':
      'Việc ghi nhận các phím cấp hệ thống, như phím Windows, yêu cầu quyền toàn màn hình',
    'image.tips.usb2': 'Đảm bảo rằng đĩa ảo đã được gắn kết trong Cài đặt > Thiết bị > Đĩa ảo.',
    'image.tips.tf2': 'Lấy thẻ TF ra khỏi NanoKVM. Với phiên bản FULL, hãy tháo vỏ trước.',
    'auth.tips.change3': 'Mật khẩu root hệ thống để đăng nhập SSH',
    'download.sha256': 'Checksum SHA-256 tùy chọn',
    'power.powerShort': 'Nút nguồn: nhấp ngắn',
    'power.powerLong': 'Nút nguồn: nhấp dài',
    'settings.tailscale.notInstall': 'Không tìm thấy Tailscale. Vui lòng cài đặt.',
    'settings.tailscale.retry': 'Vui lòng làm mới và thử lại, hoặc cài đặt thủ công.',
    'wifi.failed': 'Thao tác thất bại, vui lòng thử lại',
    'screen.webrtcConnectionFailed.description':
      'Kiểm tra kết nối mạng hoặc chuyển đổi chế độ video',
    'keyboard.shortcut.enterFullScreen': 'Chuyển sang chế độ toàn màn hình',
    'keyboard.leaderKey.desc':
      'Bỏ qua các hạn chế của trình duyệt và gửi các phím tắt hệ thống trực tiếp đến máy chủ từ xa',
    'image.mountDesc':
      'Trong một số hệ thống, cần phải eject đĩa ảo trên máy remote trước khi mount',
    'image.unmountDesc':
      'Trên một số hệ thống, bạn cần đẩy hình ảnh ra khỏi máy chủ từ xa theo cách thủ công trước khi ngắt kết nối hình ảnh',
    'auth.totp.prompt': 'Nhập mã gồm 6 chữ số từ ứng dụng xác thực của bạn',
    'auth.totp.backupPrompt': 'Nhập một trong các mã dự phòng của bạn',
    'auth.setupRecovery': 'Nếu mất mật khẩu này, việc khôi phục cần ghi lại thẻ SD',
    'download.remoteDisabled': 'Tải ISO từ xa bị tắt trong Cài đặt > Giao diện',
    'settings.device.usbWakeupDesc': 'Cho phép sự kiện bàn phím hoặc chuột đánh thức máy từ xa',
    'settings.device.usbWakeupTip': 'Tắt nếu máy ghi lặp lại thông báo USB wakeup',
    'settings.network.tls.tip':
      'Lưu ý: Sử dụng HTTPS có thể tăng độ trễ, đặc biệt trong chế độ video MJPEG',
    'settings.system.time.servers.description':
      'Dùng máy chủ công cộng mặc định, bộ định tuyến cục bộ hoặc máy chủ NTP tùy chỉnh',
    'settings.systemLog.remote.protocol': 'BusyBox syslogd hiện tại dùng UDP syslog',
    'settings.systemLog.viewer.truncated': 'Chỉ hiển thị dữ liệu nhật ký mới nhất',
    'settings.update.system.rawEnableDesc':
      'Cho phép ghi image raw boot/rootfs đã xác minh vào thẻ SD từ màn hình này',
    'settings.account.totp.description':
      'Yêu cầu mã theo thời gian từ ứng dụng xác thực ngoài mật khẩu',
    'settings.account.totp.requireDescription':
      'Khi bật, không thể tắt xác thực hai yếu tố, và tài khoản chưa có phải thiết lập trước khi dùng thiết bị',
    'picoclaw.empty': 'Mở bảng điều khiển và bắt đầu một nhiệm vụ',
    'picoclaw.agent.defaultDescription':
      'Trợ giúp chung về trò chuyện, tìm kiếm và không gian làm việc',
    'picoclaw.agent.kvmDescription': 'Vận hành máy chủ từ xa thông qua NanoKVM',
    'picoclaw.install.uninstalled': 'Đã gỡ cài đặt thành công runtime',
    'picoclaw.install.uninstallFailed': 'Gỡ cài đặt không thành công',
    'settings.device.swap.tip':
      'Kích hoạt tính năng này có thể rút ngắn thời gian sử dụng thẻ SD của bạn',
    'settings.update.previewTip':
      'Xin lưu ý rằng các bản phát hành xem trước có thể có lỗi hoặc chức năng chưa hoàn chỉnh',
    'auth.changePasswordDesc':
      'Để bảo mật thiết bị của bạn, vui lòng thay đổi mật khẩu đăng nhập web',
    'settings.network.dns.manualServersDescription': 'Hỗ trợ máy chủ IPv4 và IPv6',
    'terminal.unlockDesc': 'Nhập mật khẩu tài khoản web để bắt đầu phiên terminal',
    'terminal.locked': 'Quá nhiều lần thử. Vui lòng thử lại sau',
    'keyboard.dropdownKorean': 'Tiếng Hàn',
    'keyboard.dropdownJapanese': 'Tiếng Nhật',
    'keyboard.localInput': 'Nhập liệu từ bàn phím di động',
    'settings.network.configuration': 'Cấu hình',
    'settings.network.dns.servers': 'Máy chủ',
    'settings.system.firewall.mode.restrictedDesc':
      'Chỉ HTTPS và SSH cục bộ, cùng DNS, NTP, syslog và cập nhật trực tuyến đi ra. DHCP và lưu lượng IPv6 thiết yếu vẫn khả dụng. WebRTC bị chặn.',
    'settings.system.firewall.backends': 'Backend',
    'settings.system.firewall.restricted.confirmDesc':
      'Truy cập quản trị đi vào sẽ bị giới hạn cho HTTPS và SSH ở các dải nguồn private IPv4, IPv4 link-local/loopback, IPv6 link-local hoặc IPv6 loopback. Không cho phép dải nguồn công khai. DNS, NTP, syslog từ xa, cập nhật online, DHCP, kết nối đã thiết lập và lưu lượng điều khiển IPv6 thiết yếu đi ra vẫn khả dụng. WebRTC/ICE UDP và lưu lượng đi vào/đi ra khác sẽ bị chặn.',
    'settings.system.firewall.paranoid.confirmDesc':
      'Chỉ truy cập HTTPS từ các dải nguồn private IPv4, IPv4 link-local/loopback, IPv6 link-local hoặc IPv6 loopback còn khả dụng. SSH, HTTP, mDNS, NTP, tải xuống GitHub và lưu lượng khác sẽ bị chặn ngoại trừ DHCP/điều khiển IPv6 tối thiểu.',
    'settings.system.sections.systemLog': 'Ghi nhật ký',
    'settings.systemLog.remote.title': 'Ghi nhật ký từ xa',
    'settings.systemLog.remote.forward': 'Chuyển tiếp nhật ký hệ thống',
    'settings.systemLog.remote.description': 'Chuyển tiếp thông báo hệ thống tới máy chủ từ xa',
    'settings.systemLog.kernel.title': 'Ghi nhật ký kernel',
    'settings.systemLog.local.title': 'Bộ đệm nhật ký hệ thống',
    'settings.systemLog.remote.hostDesc': 'Tên máy chủ hoặc địa chỉ IPv4 của máy chủ syslog',
    'settings.systemLog.kernel.enabledDesc': 'Ghi các thông báo kernel vào nhật ký hệ thống',
    'settings.systemLog.kernel.consoleLevelDesc':
      'Mức khẩn cấp tối thiểu để thông báo kernel được in ra bảng điều khiển',
    'settings.systemLog.local.priorityDesc': 'Mức khẩn cấp tối thiểu để thông báo được ghi',
    'settings.systemLog.local.bufferDesc': 'Kích thước nhật ký mà tại đó tệp được xoay vòng',
    'settings.systemLog.local.rotationsDesc': 'Số tệp nhật ký đã xoay vòng được giữ lại',
    'settings.systemLog.local.compactDesc': 'Bỏ tên máy chủ và facility khỏi mỗi dòng',
    'settings.systemLog.local.stripTimestampsDesc':
      'Xóa dấu thời gian do bên gửi thêm; syslog tự thêm dấu thời gian của nó',
    'settings.systemLog.local.description':
      'Nhật ký hiện tại được giữ trong RAM tại {{path}} để tránh ghi vào thẻ SD',
    'settings.systemLog.kernel.enabled': 'Chuyển tiếp nhật ký kernel',
    'settings.device.swap.size': 'Kích thước Swap',
    'settings.device.swap.description': 'Dùng tệp hoán đổi khi bộ nhớ sắp hết',
    'settings.device.swap.sizeDescription': 'Đặt kích thước tệp hoán đổi',
    'settings.device.sections.connectivity': 'Kết nối',
    'settings.device.sections.hostConnection': 'Kết nối với máy chủ',
    'settings.device.sections.inputOutput': 'Đầu vào và đầu ra',
    'settings.device.sections.optimizations': 'Tối ưu hóa',
    'settings.device.minutes': 'phút',
    'settings.device.oled.title': 'Thời gian chờ OLED',
    'settings.device.oled.keepOn': 'Giữ OLED luôn bật',
    'settings.device.oled.keepOnDescription': 'Không bao giờ tắt màn hình OLED',
    'settings.device.sessionLock.title': 'Khóa phiên khi không hoạt động'
  },
  zh: {
    'auth.illegalPassword': '密码至少 8 个字符，且不能包含引号或斜杠',
    'screen.videoDirectTips': '该模式需启用 HTTPS，请前往「设置 > 系统 > 网络」中开启',
    'download.disabled':
      '当前无法下载或上传镜像，因为存储不可写。如果镜像已挂载，请先卸载，然后关闭虚拟磁盘，使存储恢复可写。',
    'settings.tailscale.restart': '确定要重启 Tailscale 吗？',
    'download.inputfile': '请输入镜像文件',
    'settings.device.diskDesc': '在远程主机上挂载 SD 卡',
    'settings.device.diskCancelMount': '开启虚拟磁盘会取消当前挂载的镜像，是否继续？',
    'screen.transferRunningTitle': '镜像传输进行中',
    'screen.transferRunningDesc': '切换视频模式会重新加载页面，并取消正在进行的镜像上传或下载。',
    'screen.transferRunningOk': '切换模式',
    'settings.device.diskTransferRunning': '镜像传输正在进行。请等待其完成后再启用虚拟磁盘。',
    'settings.update.previewChannels': '同时控制应用和系统的预览通道',
    'settings.update.system.appUpdateRequired': '请先将应用更新到 {{version}}，再安装此系统更新',
    'settings.update.system.requiredAppVersion': '所需应用版本',
    'settings.system.firewall.enableHttpsFirst': '请先启用 HTTPS，再启用受限或偏执防火墙模式',
    'settings.system.firewall.httpsRequired':
      '在“设置 > 系统 > 网络”中启用 HTTPS 之前，受限和偏执模式不可用',
    'settings.system.firewall.mode.baselineDesc':
      '开放的兼容配置。防火墙正在运行，但不限制入站来源。仅在可信网络中使用。',
    'settings.system.firewall.mode.moderateDesc':
      '默认配置。保留基线的服务，但仅接受来自私有、链路本地或环回范围的新入站连接。出站访问保持开放。',
    'settings.system.firewall.mode.paranoidDesc':
      '仅限本地的 HTTPS 访问。阻止 SSH、HTTP、在线更新和其他出站网络功能。离线更新上传和已暂存的安装仍然可用。',
    'settings.system.firewall.mode.current': '当前',
    'settings.system.firewall.mode.default': '默认',
    'settings.system.firewall.mode.localOnly': '仅限本地',
    'settings.system.firewall.mode.openTag': '入站开放',
    'settings.system.firewall.mode.httpsRequiredTag': '需要 HTTPS',
    'settings.system.firewall.mode.outboundOpen': '出站开放',
    'settings.system.firewall.mode.outboundLimited': '出站受限',
    'settings.system.firewall.mode.httpsOnly': '仅 HTTPS',
    'settings.system.firewall.moderate.apply': '切换到适中',
    'settings.system.firewall.baseline.apply': '切换到基线',
    'settings.system.firewall.baseline.confirmTitle': '切换到开放的基线模式？',
    'settings.system.firewall.baseline.confirmDesc':
      '防火墙服务保持启用，但会取消仅限本地来源范围的限制。如果网络会路由，公共来源范围可能访问暴露的 NanoKVM 服务。',
    'screen.videoWebrtcBlockedByFirewall': 'H.264 WebRTC 在受限和偏执防火墙模式下已禁用',
    'settings.system.firewall.mode.baseline': '基线',
    'settings.system.firewall.mode.moderate': '适中',
    'settings.system.firewall.mode.restricted': '受限',
    'settings.system.firewall.mode.paranoid': '偏执',
    'settings.system.firewall.restricted.enable': '启用受限',
    'settings.system.firewall.restricted.confirmTitle': '启用受限防火墙模式？',
    'settings.system.firewall.paranoid.enable': '启用偏执',
    'settings.system.firewall.paranoid.confirmTitle': '启用偏执防火墙模式？',
    'settings.update.paranoidBlocked': '在线更新被偏执防火墙模式阻止',
    'settings.device.hidOnlyDesc': '当鼠标或键盘停止响应时，改善与主机的兼容性',
    'mouse.hidOnly.desc':
      '如果鼠标或键盘停止响应，且重置 HID 无效，可能是 NanoKVM 与主机之间存在兼容性问题。',
    'settings.device.hidOnlyTip': 'HID-Only 模式会停止模拟虚拟设备，仅保留基础的 HID 控制',
    'settings.device.ssh.tip': '启用此选项前，请在 帐号 > 密码 中设置强密码',
    'keyboard.shortcut.captureTips': '捕获系统级按键，如 Windows 键，需要全屏权限',
    'settings.device.diskLocked': '挂载镜像期间已关闭，开启会取消镜像挂载',
    'image.tips.usb2': '确保已在 设置 > 设备 > 虚拟磁盘 中挂载虚拟磁盘。',
    'image.tips.tf2': '将 TF 卡从 NanoKVM 中取出。FULL 版本需要先拆开外壳。',
    'auth.tips.change3': '用于 SSH 登录的系统 root 用户密码',
    'download.sha256': '可选的 SHA-256 校验值',
    'power.powerShort': '电源按钮：短按',
    'power.powerLong': '电源按钮：长按',
    'settings.tailscale.notInstall': '未检测到 Tailscale，请先安装。',
    'settings.tailscale.retry': '请刷新后重试，或尝试手动安装。',
    'wifi.success': '请前往设备检查 NanoKVM 的网络状态',
    'wifi.failed': '操作失败，请重试',
    'screen.webrtcConnectionFailed.description': '请检查网络连接或切换视频模式',
    'keyboard.shortcut.enterFullScreen': '切换全屏模式',
    'keyboard.leaderKey.desc': '绕过浏览器限制，向远程主机发送被系统拦截的快捷键',
    'image.mountDesc': '在某些系统中，需要在远程主机中弹出虚拟硬盘后再挂载镜像',
    'image.unmountDesc': '在某些系统中，需要在远程主机中手动弹出后再卸载镜像',
    'auth.totp.prompt': '请输入验证器应用中的 6 位数字验证码',
    'auth.totp.backupPrompt': '请输入其中一个备份码',
    'auth.setupRecovery': '如果此密码丢失，恢复需要重新写入 SD 卡',
    'download.remoteDisabled': '远程 ISO 下载已在 设置 > 外观 中禁用',
    'settings.device.usbWakeupDesc': '允许键盘或鼠标事件唤醒远程主机',
    'settings.device.usbWakeupTip': '如果主机反复记录 USB wakeup 消息，请关闭',
    'settings.network.tls.tip': '注意：使用 HTTPS 可能导致延迟增加，特别是在 MJPEG 视频模式下',
    'settings.system.time.servers.description': '使用默认公共服务器、本地路由器或自定义 NTP 服务器',
    'settings.systemLog.remote.protocol': '当前 BusyBox syslogd 使用 UDP syslog',
    'settings.systemLog.viewer.truncated': '仅显示最新的日志数据',
    'settings.update.system.rawEnableDesc': '允许从此页面将已验证的 raw boot/rootfs 镜像写入 SD 卡',
    'settings.account.totp.description': '除密码外，还需要验证器应用生成的基于时间的验证码',
    'settings.account.totp.requireDescription':
      '开启后无法停用两步验证，未设置的账号必须先设置才能使用设备',
    'picoclaw.empty': '打开面板并发送任务后，PicoClaw 会开始工作',
    'picoclaw.agent.defaultDescription': '适合普通问答、搜索和工作区辅助',
    'picoclaw.agent.kvmDescription': '通过 NanoKVM 操作下游远程主机',
    'picoclaw.install.uninstalled': '运行时卸载成功',
    'picoclaw.install.uninstallFailed': '卸载失败',
    'settings.device.swap.tip': '启用该功能可能会减少SD卡使用寿命',
    'settings.update.previewTip': '预览版更新可能包含一些不稳定因素或未完善的功能',
    'auth.changePasswordDesc': '为了您的设备安全，请修改密码',
    'settings.network.dns.manualServersDescription': '支持 IPv4 和 IPv6 服务器',
    'settings.tailscale.stopDesc': '退出登录并禁用开机自启。',
    'terminal.unlockDesc': '输入网页账户密码以启动终端会话',
    'terminal.locked': '尝试次数过多，请稍后再试',
    'image.loading': '加载中...',
    'keyboard.dropdownKorean': '韩语',
    'keyboard.dropdownJapanese': '日语',
    'image.tips.usb1': '将 NanoKVM 通过 USB 连接到您的电脑；',
    'image.tips.scp1': '确保 NanoKVM 和您的电脑在同一个局域网内；',
    'image.tips.tf3': '将 TF 卡插入读卡器并连接到您的电脑；',
    'picoclaw.inputPlaceholder': '描述您希望 PicoClaw 执行的操作',
    'keyboard.localInput': '移动端键盘输入',
    'settings.network.configuration': '配置',
    'settings.network.dns.servers': '服务器',
    'settings.system.firewall.mode.restrictedDesc':
      '仅限本地的 HTTPS 和 SSH，以及出站的 DNS、NTP、syslog 和在线更新。DHCP 和必要的 IPv6 流量仍然可用。WebRTC 被阻止。',
    'settings.system.firewall.backends': '后端',
    'settings.system.firewall.restricted.confirmDesc':
      '入站管理访问将仅限于来自 private IPv4、IPv4 link-local/loopback、IPv6 link-local 或 IPv6 loopback 源范围的 HTTPS 和 SSH。不允许公共源地址范围。出站 DNS、NTP、远程 syslog、在线更新、DHCP、已建立连接和必要的 IPv6 控制流量仍可用。WebRTC/ICE UDP 以及其他入站/出站流量将被阻止。',
    'settings.system.firewall.paranoid.confirmDesc':
      '仅保留来自 private IPv4、IPv4 link-local/loopback、IPv6 link-local 或 IPv6 loopback 源范围的 HTTPS 访问。SSH、HTTP、mDNS、NTP、GitHub 下载和其他流量将被阻止，仅保留最小 DHCP/IPv6 控制流量。',
    'settings.system.sections.systemLog': '日志',
    'settings.systemLog.remote.title': '远程日志记录',
    'settings.systemLog.remote.forward': '转发系统日志',
    'settings.systemLog.remote.description': '将系统消息转发到远程服务器',
    'settings.systemLog.kernel.title': '内核日志记录',
    'settings.systemLog.local.title': '系统日志缓冲区',
    'settings.systemLog.remote.hostDesc': 'syslog 服务器的主机名或 IPv4 地址',
    'settings.systemLog.kernel.enabledDesc': '将内核消息记录到系统日志',
    'settings.systemLog.kernel.consoleLevelDesc': '内核消息输出到控制台所需的最低紧急程度',
    'settings.systemLog.local.priorityDesc': '消息被记录所需的最低紧急程度',
    'settings.systemLog.local.bufferDesc': '日志文件达到此大小时进行轮转',
    'settings.systemLog.local.rotationsDesc': '保留的已轮转日志文件数量',
    'settings.systemLog.local.compactDesc': '在每行中省略主机名和 facility',
    'settings.systemLog.local.stripTimestampsDesc':
      '移除发送方添加的时间戳；syslog 会添加自己的时间戳',
    'settings.systemLog.local.description': '当前日志保存在 RAM 的 {{path}}，以避免写入 SD 卡',
    'settings.systemLog.kernel.enabled': '转发内核日志',
    'settings.device.swap.size': 'Swap 大小',
    'settings.device.swap.description': '内存不足时使用交换文件',
    'settings.device.swap.sizeDescription': '设置交换文件大小',
    'settings.device.sections.connectivity': '连接',
    'settings.device.sections.hostConnection': '主机连接',
    'settings.device.sections.inputOutput': '输入与输出',
    'settings.device.sections.optimizations': '优化',
    'settings.device.minutes': '分钟',
    'settings.device.oled.title': 'OLED 超时',
    'settings.device.oled.keepOn': '保持 OLED 常亮',
    'settings.device.oled.keepOnDescription': '从不关闭 OLED 屏幕',
    'settings.device.sessionLock.title': '闲置时锁定会话'
  },
  zh_tw: {
    'auth.illegalPassword': '密碼至少 8 個字元，且不能包含引號或斜線',
    'screen.videoDirectTips': '本模式需先啟用 HTTPS，請前往「設定 > 系統 > 網路」中開啟',
    'download.disabled':
      '目前無法下載或上傳映像檔，因為儲存空間不可寫入。若映像檔已掛載，請先卸載，然後關閉虛擬磁碟，讓儲存空間恢復可寫入。',
    'screen.scale': '縮放',
    'settings.about.imageTip': 'NanoKVM 系統韌體版本',
    'settings.tailscale.upTailscaled': '將 tailscaled 上傳到 NanoKVM 的 /usr/sbin/ 資料夾',
    'screen.video': '影片模式',
    'download.inputfile': '請輸入映像檔',
    'settings.device.diskDesc': '在遠端主機上掛載 SD 卡',
    'settings.device.diskCancelMount': '開啟虛擬磁碟會取消目前掛載的映像檔，是否繼續？',
    'screen.transferRunningTitle': '映像檔傳輸進行中',
    'screen.transferRunningDesc': '切換影片模式會重新載入頁面，並取消正在進行的映像檔上傳或下載。',
    'screen.transferRunningOk': '切換模式',
    'settings.device.diskTransferRunning': '映像檔傳輸正在進行。請等待其完成後再啟用虛擬磁碟。',
    'settings.update.previewChannels': '同時控制應用程式與系統的預覽通道',
    'settings.update.system.appUpdateRequired':
      '請先將應用程式更新到 {{version}}，再安裝此系統更新',
    'settings.update.system.requiredAppVersion': '所需應用程式版本',
    'settings.system.firewall.enableHttpsFirst': '請先啟用 HTTPS，再啟用受限或偏執防火牆模式',
    'settings.system.firewall.httpsRequired':
      '在「設定 > 系統 > 網路」中啟用 HTTPS 之前，受限和偏執模式無法使用',
    'settings.system.firewall.mode.baselineDesc':
      '開放的相容設定檔。防火牆正在執行，但不限制傳入來源。僅在可信任的網路中使用。',
    'settings.system.firewall.mode.moderateDesc':
      '預設設定檔。保留基準的服務，但僅接受來自私有、連結本機或迴路範圍的新傳入連線。輸出存取保持開放。',
    'settings.system.firewall.mode.paranoidDesc':
      '僅限本機的 HTTPS 存取。封鎖 SSH、HTTP、線上更新和其他傳出網路功能。離線更新上傳和已暫存的安裝仍然可用。',
    'settings.system.firewall.mode.current': '目前',
    'settings.system.firewall.mode.default': '預設',
    'settings.system.firewall.mode.localOnly': '僅限本機',
    'settings.system.firewall.mode.openTag': '傳入開放',
    'settings.system.firewall.mode.httpsRequiredTag': '需要 HTTPS',
    'settings.system.firewall.mode.outboundOpen': '傳出開放',
    'settings.system.firewall.mode.outboundLimited': '傳出受限',
    'settings.system.firewall.mode.httpsOnly': '僅 HTTPS',
    'settings.system.firewall.moderate.apply': '切換到適中',
    'settings.system.firewall.baseline.apply': '切換到基準',
    'settings.system.firewall.baseline.confirmTitle': '切換到開放的基準模式？',
    'settings.system.firewall.baseline.confirmDesc':
      '防火牆服務維持啟用，但會取消僅限本機來源範圍的限制。若網路會路由，公開來源範圍可能存取暴露的 NanoKVM 服務。',
    'screen.videoWebrtcBlockedByFirewall': 'H.264 WebRTC 在受限和偏執防火牆模式下已停用',
    'settings.system.firewall.mode.baseline': '基準',
    'settings.system.firewall.mode.moderate': '適中',
    'settings.system.firewall.mode.restricted': '受限',
    'settings.system.firewall.mode.paranoid': '偏執',
    'settings.system.firewall.restricted.enable': '啟用受限',
    'settings.system.firewall.restricted.confirmTitle': '啟用受限防火牆模式？',
    'settings.system.firewall.paranoid.enable': '啟用偏執',
    'settings.system.firewall.paranoid.confirmTitle': '啟用偏執防火牆模式？',
    'settings.update.paranoidBlocked': '線上更新被偏執防火牆模式阻擋',
    'settings.device.hidOnlyDesc': '當滑鼠或鍵盤停止回應時，改善與主機的相容性',
    'mouse.hidOnly.desc':
      '如果滑鼠或鍵盤停止回應，且重設 HID 無效，可能是 NanoKVM 與主機之間存在相容性問題。',
    'settings.device.hidOnlyTip': 'HID-Only 模式會停止模擬虛擬設備，僅保留基礎 HID 控制',
    'settings.device.ssh.tip': '啟用此選項前，請在 帳號 > 密碼 中設定強密碼',
    'keyboard.shortcut.captureTips': '擷取系統級按鍵，如 Windows 鍵，需要全螢幕權限',
    'settings.device.diskLocked': '掛載映像檔期間已關閉，開啟會取消映像檔掛載',
    'image.tips.usb2': '確保已在 設定 > 設備 > 虛擬磁碟 中掛載虛擬磁碟。',
    'image.tips.tf2': '從 NanoKVM 取出 TF 卡。FULL 版本請先拆開外殼。',
    'auth.tips.change3': '用於 SSH 登入的系統 root 密碼',
    'download.sha256': '可選的 SHA-256 檢查碼',
    'power.powerShort': '電源按鈕：短按',
    'power.powerLong': '電源按鈕：長按',
    'settings.tailscale.notInstall': '未找到 Tailscale。請先安裝。',
    'settings.tailscale.retry': '請重新整理並重試，或嘗試手動安裝。',
    'wifi.success': '請檢查 NanoKVM 的網路狀態，並存取新的 IP 位址',
    'wifi.failed': '操作失敗，請重試',
    'screen.webrtcConnectionFailed.description': '請檢查網路連線或切換影片模式',
    'keyboard.shortcut.enterFullScreen': '切換全螢幕模式',
    'keyboard.leaderKey.desc': '繞過瀏覽器限制並將系統捷徑直接傳送到遠端主機',
    'image.mountDesc': '在某些系統中，需要在遠端主機中彈出虛擬硬碟後再掛載映像檔',
    'image.unmountDesc': '在某些系統中，需要在遠端主機中手動彈出後再解除安裝映像',
    'auth.totp.prompt': '請輸入驗證器 App 中的 6 位數驗證碼',
    'auth.totp.backupPrompt': '請輸入其中一個備用碼',
    'auth.setupRecovery': '如果此密碼遺失，復原需要重新寫入 SD 卡',
    'download.remoteDisabled': '遠端 ISO 下載已在 設定 > 外觀 中停用',
    'settings.device.usbWakeupDesc': '允許鍵盤或滑鼠事件喚醒遠端主機',
    'settings.device.usbWakeupTip': '如果主機反覆記錄 USB wakeup 訊息，請關閉',
    'settings.network.tls.tip':
      '啟用 HTTPS 可以提高安全性，但可能會增加傳輸延遲，特別是使用 MJPEG 格式傳輸時',
    'settings.system.time.servers.description': '使用預設公用伺服器、本機路由器或自訂 NTP 伺服器',
    'settings.systemLog.remote.protocol': '目前 BusyBox syslogd 使用 UDP syslog',
    'settings.systemLog.viewer.truncated': '僅顯示最新的記錄資料',
    'settings.update.system.rawEnableDesc':
      '允許從此畫面將已驗證的 raw boot/rootfs 映像檔寫入 SD 卡',
    'settings.account.totp.description': '除密碼外，還需要驗證器 App 產生的時間型驗證碼',
    'settings.account.totp.requireDescription':
      '開啟後無法停用兩步驟驗證，尚未設定的帳號必須先設定才能使用裝置',
    'picoclaw.empty': '打開面板並啟動一個任務來開始',
    'picoclaw.agent.defaultDescription': '一般聊天、搜尋和工作區域幫助',
    'picoclaw.agent.kvmDescription': '透過 NanoKVM 操作遠端主機',
    'picoclaw.install.uninstalled': 'Runtime 解除安裝成功',
    'picoclaw.install.uninstallFailed': '解除安裝失敗',
    'settings.device.swap.tip': '啟用此功能可能會減少SD卡的使用壽命',
    'settings.update.previewTip': '請注意，預覽版本可能包含一些不穩定因素或未完善的功能',
    'auth.changePasswordDesc': '為了您的裝置安全，請修改登入密碼',
    'settings.network.dns.manualServersDescription': '支援 IPv4 與 IPv6 伺服器',
    'settings.device.mouseJiggler.title': '滑鼠抖動模式',
    'settings.tailscale.stopDesc': '登出並停用開機自動啟動。',
    'terminal.unlockDesc': '輸入網頁帳戶密碼以啟動終端機工作階段',
    'terminal.locked': '嘗試次數過多，請稍後再試',
    'settings.about.hostnameUpdated': '已更新主機名稱。請重新啟動以生效。',
    'keyboard.dropdownKorean': '韓語',
    'keyboard.dropdownJapanese': '日語',
    'settings.tailscale.notRunning': 'Tailscale 尚未執行，請先啟動以繼續',
    'keyboard.localInput': '行動裝置鍵盤輸入',
    'settings.network.configuration': '設定',
    'settings.network.dns.servers': '伺服器',
    'settings.system.firewall.mode.restrictedDesc':
      '僅限本機的 HTTPS 和 SSH，以及輸出的 DNS、NTP、syslog 和線上更新。DHCP 和必要的 IPv6 流量仍然可用。WebRTC 已封鎖。',
    'settings.system.firewall.backends': '後端',
    'settings.system.firewall.restricted.confirmDesc':
      '輸入管理存取會限制為 HTTPS 和 SSH 使用 private IPv4、IPv4 link-local/loopback、IPv6 link-local 或 IPv6 loopback 來源範圍。不允許公開來源範圍。輸出 DNS、NTP、遠端 syslog、線上更新、DHCP、已建立連線和必要的 IPv6 控制流量仍可使用。WebRTC/ICE UDP 以及其他輸入/輸出流量會被阻擋。',
    'settings.system.firewall.paranoid.confirmDesc':
      '僅保留來自 private IPv4、IPv4 link-local/loopback、IPv6 link-local 或 IPv6 loopback 來源範圍的 HTTPS 存取。SSH、HTTP、mDNS、NTP、GitHub 下載和其他流量將被阻擋，只保留最小 DHCP/IPv6 控制流量。',
    'settings.system.sections.systemLog': '記錄',
    'settings.systemLog.remote.title': '遠端記錄',
    'settings.systemLog.remote.forward': '轉送系統記錄',
    'settings.systemLog.remote.description': '將系統訊息轉送到遠端伺服器',
    'settings.systemLog.kernel.title': '核心記錄',
    'settings.systemLog.local.title': '系統記錄緩衝區',
    'settings.systemLog.remote.hostDesc': 'syslog 伺服器的主機名稱或 IPv4 位址',
    'settings.systemLog.kernel.enabledDesc': '將核心訊息記錄到系統記錄',
    'settings.systemLog.kernel.consoleLevelDesc': '核心訊息輸出到主控台所需的最低緊急程度',
    'settings.systemLog.local.priorityDesc': '訊息被記錄所需的最低緊急程度',
    'settings.systemLog.local.bufferDesc': '記錄檔達到此大小時進行輪替',
    'settings.systemLog.local.rotationsDesc': '保留的已輪替記錄檔數量',
    'settings.systemLog.local.compactDesc': '在每一行省略主機名稱和 facility',
    'settings.systemLog.local.stripTimestampsDesc':
      '移除傳送端加入的時間戳記；syslog 會加入自己的時間戳記',
    'settings.systemLog.local.description': '目前記錄保存在 RAM 的 {{path}}，以避免寫入 SD 卡',
    'settings.systemLog.kernel.enabled': '轉送核心記錄',
    'settings.device.swap.size': 'Swap 大小',
    'settings.device.swap.description': '記憶體不足時使用 Swap 檔',
    'settings.device.swap.sizeDescription': '設定 Swap 檔大小',
    'settings.device.sections.connectivity': '連線',
    'settings.device.sections.hostConnection': '主機連線',
    'settings.device.sections.inputOutput': '輸入與輸出',
    'settings.device.sections.optimizations': '最佳化',
    'settings.device.minutes': '分鐘',
    'settings.device.oled.title': 'OLED 逾時',
    'settings.device.oled.keepOn': '保持 OLED 常亮',
    'settings.device.oled.keepOnDescription': '從不關閉 OLED 螢幕',
    'settings.device.sessionLock.title': '閒置時鎖定工作階段'
  }
};
