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
      "Actualitza l'aplicació a {{version}} abans d'instal·lar aquesta actualització del sistema.",
    'settings.update.system.requiredAppVersion': "Versió d'aplicació necessària",
    'settings.system.firewall.enableHttpsFirst':
      "Activa HTTPS abans d'activar el mode de tallafoc Restringit o Paranoic",
    'settings.system.firewall.httpsRequired':
      "Els modes Restringit i Paranoic estan desactivats fins que s'activi HTTPS a Configuració > Sistema > Xarxa.",
    'settings.system.firewall.mode.baselineDesc':
      "Perfil obert i gestionat. Manté l'accés normal a NanoKVM sense filtrar per intervals d'origen.",
    'settings.system.firewall.mode.moderateDesc':
      "Perfil per defecte. Manté els serveis de Base, però només accepta noves connexions entrants d'intervals privats, ULA, d'enllaç local o de loopback.",
    'settings.system.firewall.mode.paranoidDesc':
      'Accés HTTPS només local. Bloqueja SSH, HTTP, les actualitzacions en línia i altres funcions de xarxa de sortida.',
    'settings.system.firewall.mode.current': 'Actual',
    'settings.system.firewall.mode.default': 'Per defecte',
    'settings.system.firewall.mode.localOnly': 'Només local',
    'settings.system.firewall.mode.openTag': 'Obert',
    'settings.system.firewall.mode.httpsRequiredTag': 'Cal HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Sortida oberta',
    'settings.system.firewall.mode.outboundLimited': 'Sortida limitada',
    'settings.system.firewall.mode.httpsOnly': 'Només HTTPS',
    'settings.system.firewall.moderate.apply': 'Canvia a Moderat',
    'settings.system.firewall.moderate.active': 'El mode de tallafoc Moderat està actiu',
    'settings.system.firewall.moderate.allows':
      "Només s'accepten connexions entrants d'intervals d'origen IPv4 privats, IPv4 d'enllaç local/loopback, IPv6 ULA, IPv6 d'enllaç local o IPv6 loopback. L'accés de sortida continua obert.",
    'settings.system.firewall.baseline.apply': 'Canvia a Base',
    'settings.system.firewall.baseline.active': 'El mode de tallafoc Base està actiu',
    'settings.system.firewall.baseline.allows':
      "El servei de tallafoc està actiu, però els intervals d'origen entrants no estan restringits. Utilitza-ho només en entorns de laboratori de confiança o per compatibilitat.",
    'settings.system.firewall.baseline.confirmTitle': 'Canviar al mode Base obert?',
    'settings.system.firewall.baseline.confirmDesc':
      "El servei de tallafoc continua actiu, però se suprimeix la restricció d'intervals d'origen només locals. Els intervals d'origen públics poden arribar als serveis exposats de NanoKVM si la xarxa els encamina.",
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC està desactivat en els modes de tallafoc Restringit i Paranoic',
    'settings.system.firewall.mode.description':
      'Trieu com s’exposa l’accés administratiu entrant. Moderat és el perfil local per defecte; Restringit manté HTTPS/SSH només locals i bloqueja WebRTC; Base és un perfil obert de compatibilitat.',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Moderat',
    'settings.system.firewall.mode.restricted': 'Restringit',
    'settings.system.firewall.mode.paranoid': 'Paranoic',
    'settings.system.firewall.restricted.enable': 'Activa Restringit',
    'settings.system.firewall.restricted.active': 'El mode Restringit del tallafoc està actiu',
    'settings.system.firewall.restricted.confirmTitle': 'Vols activar el mode Restringit?',
    'settings.system.firewall.paranoid.enable': 'Activa Paranoic',
    'settings.system.firewall.paranoid.active': 'El mode Paranoic del tallafoc està actiu',
    'settings.system.firewall.paranoid.confirmTitle': 'Vols activar el mode Paranoic?',
    'settings.update.paranoidBlocked':
      'Les actualitzacions en línia estan bloquejades pel mode de tallafoc Paranoic',
    'settings.device.hidOnlyDesc':
      "Millora la compatibilitat amb l'amfitrió si el ratolí o el teclat deixen de respondre",
    'mouse.hidOnly.desc':
      "Si el ratolí o el teclat deixen de respondre i restablir el HID no ajuda, pot ser un problema de compatibilitat entre el NanoKVM i l'amfitrió.",
    'settings.device.hidOnlyTip':
      "El mode HID-Only deixa d'emular dispositius virtuals i només conserva el control bàsic HID"
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
      'Před instalací této aktualizace systému aktualizujte aplikaci na verzi {{version}}.',
    'settings.update.system.requiredAppVersion': 'Požadovaná verze aplikace',
    'settings.device.diskDesc': 'Připojit SD kartu ke vzdálenému hostiteli',
    'settings.device.diskCancelMount':
      'Zapnutím virtuálního disku se zruší připojený obraz. Pokračovat?',
    'image.diskOnWarn':
      'Připojením obrazu se virtuální disk vypne, takže počítač už nebude mít přístup k /data. Pokračovat?',
    'image.diskOffWarn':
      'Virtuální disk je vypnutý a pro připojení obrazu je nutné ho zapnout. USB zařízení v počítači se znovu vyhledají. Pokračovat?',
    'download.diskShared': 'Nejprve vypněte virtuální disk a poté použijte stahování obrazu.',
    'download.diskOff': 'Vypnout virtuální disk',
    'settings.device.diskLocked': 'Vypnuto, dokud je připojen obraz (zapnutím se připojení zruší)',
    'settings.tailscale.memory.tip':
      'Když využití paměti překročí limit, uvolňování paměti (garbage collection) probíhá agresivněji, aby se paměť uvolnila. Aby se změna projevila, je nutné Tailscale restartovat.',
    'settings.tailscale.restart': 'Restartovat Tailscale?',
    'settings.tailscale.stop': 'Zastavit Tailscale?',
    'settings.tailscale.stopDesc':
      'Odhlásí Tailscale a vypne jeho automatické spouštění při startu systému.',
    'settings.tailscale.okBtn': 'Ano',
    'settings.tailscale.cancelBtn': 'Ne',
    'wifi.success': 'Přejděte k zařízení a zkontrolujte stav sítě NanoKVM.',
    'settings.system.firewall.enableHttpsFirst':
      'Před zapnutím režimu firewallu Omezený nebo Paranoidní zapněte HTTPS',
    'settings.system.firewall.httpsRequired':
      'Režimy Omezený a Paranoidní jsou vypnuté, dokud není HTTPS zapnuto v Nastavení > Systém > Síť.',
    'settings.system.firewall.mode.baselineDesc':
      'Otevřený spravovaný profil. Zachovává běžný přístup k NanoKVM bez filtrování podle zdrojových rozsahů.',
    'settings.system.firewall.mode.moderateDesc':
      'Výchozí profil. Zachovává služby profilu Základní, ale nová příchozí spojení přijímá jen ze soukromých, ULA, link-local nebo loopback rozsahů.',
    'settings.system.firewall.mode.paranoidDesc':
      'Přístup HTTPS pouze z lokální sítě. Blokuje SSH, HTTP, online aktualizace a další odchozí síťové funkce.',
    'settings.system.firewall.mode.current': 'Aktuální',
    'settings.system.firewall.mode.default': 'Výchozí',
    'settings.system.firewall.mode.localOnly': 'Pouze lokálně',
    'settings.system.firewall.mode.openTag': 'Otevřený',
    'settings.system.firewall.mode.httpsRequiredTag': 'Vyžaduje HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Odchozí otevřené',
    'settings.system.firewall.mode.outboundLimited': 'Odchozí omezené',
    'settings.system.firewall.mode.httpsOnly': 'Pouze HTTPS',
    'settings.system.firewall.moderate.apply': 'Přepnout na Umírněný',
    'settings.system.firewall.moderate.active': 'Režim firewallu Umírněný je aktivní',
    'settings.system.firewall.moderate.allows':
      'Příchozí spojení se přijímají jen ze zdrojových rozsahů soukromých IPv4, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local nebo IPv6 loopback. Odchozí přístup zůstává otevřený.',
    'settings.system.firewall.baseline.apply': 'Přepnout na Základní',
    'settings.system.firewall.baseline.active': 'Režim firewallu Základní je aktivní',
    'settings.system.firewall.baseline.allows':
      'Služba firewallu je aktivní, ale příchozí zdrojové rozsahy nejsou omezeny. Používejte jen v důvěryhodném laboratorním prostředí nebo kvůli kompatibilitě.',
    'settings.system.firewall.baseline.confirmTitle': 'Přepnout na otevřený režim Základní?',
    'settings.system.firewall.baseline.confirmDesc':
      'Služba firewallu zůstane aktivní, ale odstraní se omezení pouze na lokální zdrojové rozsahy. Veřejné zdrojové rozsahy se mohou dostat k vystaveným službám NanoKVM, pokud je síť směruje.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC je v režimech firewallu Omezený a Paranoidní vypnuto',
    'settings.system.firewall.mode.description':
      'Vyberte, jak bude vystaven příchozí administrátorský přístup. Umírněný je výchozí lokální profil; Omezený ponechá HTTPS/SSH pouze lokálně a blokuje WebRTC; Základní je otevřený kompatibilní profil.',
    'settings.system.firewall.mode.baseline': 'Základní',
    'settings.system.firewall.mode.moderate': 'Umírněný',
    'settings.system.firewall.mode.restricted': 'Omezený',
    'settings.system.firewall.mode.paranoid': 'Paranoidní',
    'settings.system.firewall.restricted.enable': 'Povolit Omezený',
    'settings.system.firewall.restricted.active': 'Režim firewallu Omezený je aktivní',
    'settings.system.firewall.restricted.confirmTitle': 'Povolit režim Omezený?',
    'settings.system.firewall.paranoid.enable': 'Povolit Paranoidní',
    'settings.system.firewall.paranoid.active': 'Režim firewallu Paranoidní je aktivní',
    'settings.system.firewall.paranoid.confirmTitle': 'Povolit režim Paranoidní?',
    'settings.update.paranoidBlocked':
      'Online aktualizace jsou blokovány režimem firewallu Paranoidní',
    'settings.device.hidOnlyDesc':
      'Zlepšuje kompatibilitu s hostitelem, pokud myš nebo klávesnice přestanou reagovat',
    'mouse.hidOnly.desc':
      'Pokud myš nebo klávesnice přestanou reagovat a reset HID nepomůže, může jít o problém s kompatibilitou mezi NanoKVM a hostitelem.',
    'settings.device.hidOnlyTip':
      'Režim HID-Only přestane emulovat virtuální zařízení a ponechá pouze základní ovládání HID'
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
      'Opdater programmet til {{version}}, før du installerer denne systemopdatering.',
    'settings.update.system.requiredAppVersion': 'Påkrævet programversion',
    'settings.device.diskDesc': 'Monter SD-kortet på den eksterne vært',
    'settings.device.diskCancelMount':
      'Hvis du aktiverer den virtuelle disk, annulleres det monterede billede. Fortsæt?',
    'image.diskOnWarn':
      'Når billedet monteres, slukkes den virtuelle disk, så computeren ikke længere har adgang til /data. Fortsæt?',
    'image.diskOffWarn':
      'Den virtuelle disk er slukket og skal aktiveres for at montere billedet. USB-enhederne på computeren genopregistreres. Fortsæt?',
    'download.diskShared': 'Sluk først den virtuelle disk, og brug derefter billeddownloaden.',
    'download.diskOff': 'Sluk den virtuelle disk',
    'settings.device.diskLocked':
      'Slukket, mens et billede er monteret (aktivering annullerer monteringen)',
    'settings.tailscale.memory.tip':
      'Når hukommelsesforbruget overstiger grænsen, kører garbage collection mere aggressivt for at frigøre hukommelse. Tailscale skal genstartes, for at ændringen træder i kraft.',
    'settings.tailscale.restart': 'Genstart Tailscale?',
    'settings.tailscale.stop': 'Stop Tailscale?',
    'settings.tailscale.stopDesc':
      'Logger Tailscale ud og deaktiverer automatisk start ved opstart.',
    'settings.tailscale.okBtn': 'Ja',
    'settings.tailscale.cancelBtn': 'Nej',
    'wifi.success': "Gå hen til enheden og kontrollér NanoKVM's netværksstatus.",
    'settings.system.firewall.enableHttpsFirst':
      'Aktivér HTTPS, før du aktiverer firewalltilstanden Begrænset eller Paranoid',
    'settings.system.firewall.httpsRequired':
      'Tilstandene Begrænset og Paranoid er deaktiveret, indtil HTTPS er aktiveret under Indstillinger > System > Netværk.',
    'settings.system.firewall.mode.baselineDesc':
      'Åben administreret profil. Bevarer normal adgang til NanoKVM uden filtrering efter kildeintervaller.',
    'settings.system.firewall.mode.moderateDesc':
      'Standardprofil. Bevarer Basis-tjenesterne, men accepterer kun nye indgående forbindelser fra private, ULA-, link-local- eller loopback-intervaller.',
    'settings.system.firewall.mode.paranoidDesc':
      'Kun lokal HTTPS-adgang. Blokerer SSH, HTTP, onlineopdateringer og andre udgående netværksfunktioner.',
    'settings.system.firewall.mode.current': 'Nuværende',
    'settings.system.firewall.mode.default': 'Standard',
    'settings.system.firewall.mode.localOnly': 'Kun lokalt',
    'settings.system.firewall.mode.openTag': 'Åben',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS påkrævet',
    'settings.system.firewall.mode.outboundOpen': 'Udgående åben',
    'settings.system.firewall.mode.outboundLimited': 'Udgående begrænset',
    'settings.system.firewall.mode.httpsOnly': 'Kun HTTPS',
    'settings.system.firewall.moderate.apply': 'Skift til Moderat',
    'settings.system.firewall.moderate.active': 'Firewalltilstanden Moderat er aktiv',
    'settings.system.firewall.moderate.allows':
      'Indgående forbindelser accepteres kun fra private IPv4-, IPv4 link-local/loopback-, IPv6 ULA-, IPv6 link-local- eller IPv6 loopback-kildeintervaller. Udgående adgang forbliver åben.',
    'settings.system.firewall.baseline.apply': 'Skift til Basis',
    'settings.system.firewall.baseline.active': 'Firewalltilstanden Basis er aktiv',
    'settings.system.firewall.baseline.allows':
      'Firewalltjenesten er aktiv, men indgående kildeintervaller er ikke begrænset. Brug kun dette i betroede laboratorie- eller kompatibilitetsscenarier.',
    'settings.system.firewall.baseline.confirmTitle': 'Skifte til den åbne tilstand Basis?',
    'settings.system.firewall.baseline.confirmDesc':
      'Firewalltjenesten forbliver aktiv, men begrænsningen til lokale kildeintervaller fjernes. Offentlige kildeintervaller kan nå eksponerede NanoKVM-tjenester, hvis netværket router dem.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC er deaktiveret i firewalltilstandene Begrænset og Paranoid',
    'settings.system.firewall.mode.description':
      'Vælg hvordan indgående administrationsadgang eksponeres. Moderat er standardprofilen kun for lokale net; Begrænset holder HTTPS/SSH kun lokalt og blokerer WebRTC; Basis er en åben kompatibilitetsprofil.',
    'settings.system.firewall.mode.baseline': 'Basis',
    'settings.system.firewall.mode.moderate': 'Moderat',
    'settings.system.firewall.mode.restricted': 'Begrænset',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Aktivér Begrænset',
    'settings.system.firewall.restricted.active': 'Firewalltilstanden Begrænset er aktiv',
    'settings.system.firewall.restricted.confirmTitle': 'Aktivér firewalltilstanden Begrænset?',
    'settings.system.firewall.paranoid.enable': 'Aktivér Paranoid',
    'settings.system.firewall.paranoid.active': 'Firewalltilstanden Paranoid er aktiv',
    'settings.system.firewall.paranoid.confirmTitle': 'Aktivér firewalltilstanden Paranoid?',
    'settings.update.paranoidBlocked': 'Onlineopdateringer blokeres af firewalltilstanden Paranoid',
    'settings.device.hidOnlyDesc':
      'Forbedrer kompatibiliteten med værten, hvis mus eller tastatur holder op med at reagere',
    'mouse.hidOnly.desc':
      'Hvis mus eller tastatur holder op med at reagere, og nulstilling af HID ikke hjælper, kan det være et kompatibilitetsproblem mellem NanoKVM og værten.',
    'settings.device.hidOnlyTip':
      'HID-Only-tilstand stopper emuleringen af virtuelle enheder og beholder kun grundlæggende HID-kontrol'
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
      'Setzen Sie vor dem Aktivieren ein starkes Passwort (Konto - Passwort ändern)',
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
      'Aktualisieren Sie die Anwendung auf {{version}}, bevor Sie dieses Systemupdate installieren.',
    'settings.update.system.requiredAppVersion': 'Erforderliche Anwendungsversion',
    'settings.system.firewall.enableHttpsFirst':
      'HTTPS aktivieren, bevor der Firewall-Modus Eingeschränkt oder Paranoid aktiviert wird',
    'settings.system.firewall.httpsRequired':
      'Die Modi Eingeschränkt und Paranoid sind deaktiviert, bis HTTPS unter Einstellungen > System > Netzwerk aktiviert wird.',
    'settings.system.firewall.mode.baselineDesc':
      'Offenes, verwaltetes Profil. Behält den normalen NanoKVM-Zugriff ohne Filterung nach Quellbereichen bei.',
    'settings.system.firewall.mode.moderateDesc':
      'Standardprofil. Behält die Basis-Dienste bei, nimmt neue eingehende Verbindungen aber nur aus privaten, ULA-, Link-Local- oder Loopback-Bereichen an.',
    'settings.system.firewall.mode.paranoidDesc':
      'Nur lokaler HTTPS-Zugriff. Blockiert SSH, HTTP, Online-Updates und andere ausgehende Netzwerkfunktionen.',
    'settings.system.firewall.mode.current': 'Aktuell',
    'settings.system.firewall.mode.default': 'Standard',
    'settings.system.firewall.mode.localOnly': 'Nur lokal',
    'settings.system.firewall.mode.openTag': 'Offen',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS erforderlich',
    'settings.system.firewall.mode.outboundOpen': 'Ausgehend offen',
    'settings.system.firewall.mode.outboundLimited': 'Ausgehend eingeschränkt',
    'settings.system.firewall.mode.httpsOnly': 'Nur HTTPS',
    'settings.system.firewall.moderate.apply': 'Zu Moderat wechseln',
    'settings.system.firewall.moderate.active': 'Der Firewall-Modus Moderat ist aktiv',
    'settings.system.firewall.moderate.allows':
      'Eingehende Verbindungen werden nur aus privaten IPv4-, IPv4-Link-Local/Loopback-, IPv6-ULA-, IPv6-Link-Local- oder IPv6-Loopback-Quellbereichen angenommen. Ausgehender Zugriff bleibt offen.',
    'settings.system.firewall.baseline.apply': 'Zu Basis wechseln',
    'settings.system.firewall.baseline.active': 'Der Firewall-Modus Basis ist aktiv',
    'settings.system.firewall.baseline.allows':
      'Der Firewall-Dienst ist aktiv, aber eingehende Quellbereiche sind nicht eingeschränkt. Nur in vertrauenswürdigen Labor- oder Kompatibilitätsszenarien verwenden.',
    'settings.system.firewall.baseline.confirmTitle': 'Zum offenen Modus Basis wechseln?',
    'settings.system.firewall.baseline.confirmDesc':
      'Der Firewall-Dienst bleibt aktiv, aber die Beschränkung auf lokale Quellbereiche entfällt. Öffentliche Quellbereiche können exponierte NanoKVM-Dienste erreichen, wenn das Netzwerk sie weiterleitet.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC ist in den Firewall-Modi Eingeschränkt und Paranoid deaktiviert',
    'settings.system.firewall.mode.description':
      'Wählen Sie, wie eingehender Adminzugriff erreichbar ist. Moderat ist das standardmäßige lokale Profil; Eingeschränkt hält HTTPS/SSH lokal und blockiert WebRTC; Basis ist ein offenes Kompatibilitätsprofil.',
    'settings.system.firewall.mode.baseline': 'Basis',
    'settings.system.firewall.mode.moderate': 'Moderat',
    'settings.system.firewall.mode.restricted': 'Eingeschränkt',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Eingeschränkt aktivieren',
    'settings.system.firewall.restricted.active': 'Der Firewall-Modus Eingeschränkt ist aktiv',
    'settings.system.firewall.restricted.confirmTitle': 'Firewall-Modus Eingeschränkt aktivieren?',
    'settings.system.firewall.paranoid.enable': 'Paranoid aktivieren',
    'settings.system.firewall.paranoid.active': 'Der Firewall-Modus Paranoid ist aktiv',
    'settings.system.firewall.paranoid.confirmTitle': 'Firewall-Modus Paranoid aktivieren?',
    'settings.update.paranoidBlocked':
      'Online-Updates werden vom Firewall-Modus Paranoid blockiert',
    'settings.device.hidOnlyDesc':
      'Verbessert die Kompatibilität mit dem Host, wenn Maus oder Tastatur nicht mehr reagieren',
    'mouse.hidOnly.desc':
      'Wenn Maus oder Tastatur nicht mehr reagieren und ein Zurücksetzen von HID nicht hilft, kann ein Kompatibilitätsproblem zwischen dem NanoKVM und dem Host vorliegen.',
    'settings.device.hidOnlyTip':
      'Der HID-Only-Modus beendet die Emulation virtueller Geräte und behält nur die grundlegende HID-Steuerung bei'
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
      'Actualiza la aplicación a {{version}} antes de instalar esta actualización del sistema.',
    'settings.update.system.requiredAppVersion': 'Versión de aplicación requerida',
    'settings.system.firewall.enableHttpsFirst':
      'Activa HTTPS antes de activar el modo de firewall Restringido o Paranoico',
    'settings.system.firewall.httpsRequired':
      'Los modos Restringido y Paranoico están desactivados hasta que se active HTTPS en Ajustes > Sistema > Red.',
    'settings.system.firewall.mode.baselineDesc':
      'Perfil abierto y gestionado. Mantiene el acceso normal a NanoKVM sin filtrar por rangos de origen.',
    'settings.system.firewall.mode.moderateDesc':
      'Perfil predeterminado. Mantiene los servicios de Base, pero solo acepta nuevas conexiones entrantes de rangos privados, ULA, link-local o loopback.',
    'settings.system.firewall.mode.paranoidDesc':
      'Acceso HTTPS solo local. Bloquea SSH, HTTP, las actualizaciones en línea y otras funciones de red de salida.',
    'settings.system.firewall.mode.current': 'Actual',
    'settings.system.firewall.mode.default': 'Predeterminado',
    'settings.system.firewall.mode.localOnly': 'Solo local',
    'settings.system.firewall.mode.openTag': 'Abierto',
    'settings.system.firewall.mode.httpsRequiredTag': 'Requiere HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Salida abierta',
    'settings.system.firewall.mode.outboundLimited': 'Salida limitada',
    'settings.system.firewall.mode.httpsOnly': 'Solo HTTPS',
    'settings.system.firewall.moderate.apply': 'Cambiar a Moderado',
    'settings.system.firewall.moderate.active': 'El modo de firewall Moderado está activo',
    'settings.system.firewall.moderate.allows':
      'Solo se aceptan conexiones entrantes de rangos de origen IPv4 privados, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local o IPv6 loopback. El acceso de salida sigue abierto.',
    'settings.system.firewall.baseline.apply': 'Cambiar a Base',
    'settings.system.firewall.baseline.active': 'El modo de firewall Base está activo',
    'settings.system.firewall.baseline.allows':
      'El servicio de firewall está activo, pero los rangos de origen entrantes no están restringidos. Úsalo solo en entornos de laboratorio de confianza o por compatibilidad.',
    'settings.system.firewall.baseline.confirmTitle': '¿Cambiar al modo Base abierto?',
    'settings.system.firewall.baseline.confirmDesc':
      'El servicio de firewall sigue activo, pero se elimina la restricción a rangos de origen solo locales. Los rangos de origen públicos pueden llegar a los servicios expuestos de NanoKVM si la red los enruta.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC está desactivado en los modos de firewall Restringido y Paranoico',
    'settings.system.firewall.mode.description':
      'Elige cómo se expone el acceso administrativo entrante. Moderado es el perfil local predeterminado; Restringido mantiene HTTPS/SSH solo local y bloquea WebRTC; Base es un perfil abierto de compatibilidad.',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Moderado',
    'settings.system.firewall.mode.restricted': 'Restringido',
    'settings.system.firewall.mode.paranoid': 'Paranoico',
    'settings.system.firewall.restricted.enable': 'Activar Restringido',
    'settings.system.firewall.restricted.active': 'El modo Restringido del firewall está activo',
    'settings.system.firewall.restricted.confirmTitle': '¿Activar el modo Restringido?',
    'settings.system.firewall.paranoid.enable': 'Activar Paranoico',
    'settings.system.firewall.paranoid.active': 'El modo Paranoico del firewall está activo',
    'settings.system.firewall.paranoid.confirmTitle': '¿Activar el modo Paranoico?',
    'settings.update.paranoidBlocked':
      'Las actualizaciones en línea están bloqueadas por el modo de firewall Paranoico',
    'settings.device.hidOnlyDesc':
      'Mejora la compatibilidad con el host si el ratón o el teclado dejan de responder',
    'mouse.hidOnly.desc':
      'Si el ratón o el teclado dejan de responder y restablecer el HID no ayuda, podría tratarse de un problema de compatibilidad entre el NanoKVM y el host.',
    'settings.device.hidOnlyTip':
      'El modo HID-Only deja de emular dispositivos virtuales y conserva solo el control básico HID'
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
      'Enne selle süsteemiuuenduse paigaldamist uuenda rakendus versioonile {{version}}.',
    'settings.update.system.requiredAppVersion': 'Nõutav rakenduse versioon',
    'settings.device.diskCancelMount':
      "Virtuaalse ketta lubamine tühistab ühendatud image'i. Kas jätkata?",
    'image.diskOnWarn':
      "Image'i ühendamine lülitab virtuaalse ketta välja, nii et arvuti ei pääse enam ligi kataloogile /data. Kas jätkata?",
    'image.diskOffWarn':
      "Virtuaalne ketas on välja lülitatud ja see tuleb image'i ühendamiseks lubada. Arvuti USB-seadmed loendatakse uuesti. Kas jätkata?",
    'download.diskShared':
      "Lülita esmalt virtuaalne ketta välja ja kasuta seejärel image'i allalaadimist.",
    'download.diskOff': 'Lülita virtuaalne ketas välja',
    'settings.device.diskLocked': 'Väljas, kui image on ühendatud (lubamine tühistab ühenduse)',
    'screen.webrtcConnectionFailed.title': 'WebRTC-ühendus nurjus',
    'screen.webrtcConnectionFailed.description': 'Kontrolli võrguühendust või vaheta videorežiimi.',
    'download.mountedImage':
      'See image on ühendatud. Enne sama nimega faili üleslaadimist eemalda see.',
    'download.sha256': 'SHA-256 (valikuline)',
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
      'Režiimid Piiratud ja Paranoiline on keelatud, kuni HTTPS on lubatud menüüs Seaded > Süsteem > Võrk.',
    'settings.system.firewall.mode.baselineDesc':
      'Avatud hallatud profiil. Säilitab tavalise NanoKVM-i juurdepääsu ilma lähtevahemike filtreerimiseta.',
    'settings.system.firewall.mode.moderateDesc':
      'Vaikeprofiil. Säilitab režiimi Baas teenused, kuid võtab uusi sissetulevaid ühendusi vastu ainult privaatsetest, ULA, link-local või loopback vahemikest.',
    'settings.system.firewall.mode.paranoidDesc':
      'Ainult kohalik HTTPS-juurdepääs. Blokeerib SSH, HTTP, veebipõhised uuendused ja muud väljuvad võrgufunktsioonid.',
    'settings.system.firewall.mode.current': 'Praegune',
    'settings.system.firewall.mode.default': 'Vaikimisi',
    'settings.system.firewall.mode.localOnly': 'Ainult kohalik',
    'settings.system.firewall.mode.openTag': 'Avatud',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS nõutav',
    'settings.system.firewall.mode.outboundOpen': 'Väljuv avatud',
    'settings.system.firewall.mode.outboundLimited': 'Väljuv piiratud',
    'settings.system.firewall.mode.httpsOnly': 'Ainult HTTPS',
    'settings.system.firewall.moderate.apply': 'Lülitu režiimile Mõõdukas',
    'settings.system.firewall.moderate.active': 'Tulemüüri režiim Mõõdukas on aktiivne',
    'settings.system.firewall.moderate.allows':
      'Sissetulevaid ühendusi võetakse vastu ainult privaatsetest IPv4, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local või IPv6 loopback lähtevahemikest. Väljuv juurdepääs jääb avatuks.',
    'settings.system.firewall.baseline.apply': 'Lülitu režiimile Baas',
    'settings.system.firewall.baseline.active': 'Tulemüüri režiim Baas on aktiivne',
    'settings.system.firewall.baseline.allows':
      'Tulemüüri teenus on aktiivne, kuid sissetulevaid lähtevahemikke ei piirata. Kasuta seda ainult usaldusväärsetes labori- või ühilduvusstsenaariumites.',
    'settings.system.firewall.baseline.confirmTitle': 'Lülituda avatud režiimile Baas?',
    'settings.system.firewall.baseline.confirmDesc':
      'Tulemüüri teenus jääb aktiivseks, kuid kohalike lähtevahemike piirang eemaldatakse. Avalikud lähtevahemikud võivad jõuda NanoKVM-i avatud teenusteni, kui võrk neid marsruudib.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC on tulemüürirežiimides Piiratud ja Paranoiline keelatud',
    'settings.system.firewall.mode.description':
      'Vali, kuidas sissetulev haldusligipääs avatakse. Mõõdukas on vaikimisi ainult kohalik profiil; Piiratud hoiab HTTPS/SSH ainult kohaliku ja blokeerib WebRTC; Baas on avatud ühilduvusprofiil.',
    'settings.system.firewall.mode.baseline': 'Baas',
    'settings.system.firewall.mode.moderate': 'Mõõdukas',
    'settings.system.firewall.mode.restricted': 'Piiratud',
    'settings.system.firewall.mode.paranoid': 'Paranoiline',
    'settings.system.firewall.restricted.enable': 'Luba Piiratud',
    'settings.system.firewall.restricted.active': 'Tulemüüri režiim Piiratud on aktiivne',
    'settings.system.firewall.restricted.confirmTitle': 'Kas lubada tulemüüri režiim Piiratud?',
    'settings.system.firewall.paranoid.enable': 'Luba Paranoiline',
    'settings.system.firewall.paranoid.active': 'Tulemüüri režiim Paranoiline on aktiivne',
    'settings.system.firewall.paranoid.confirmTitle': 'Kas lubada tulemüüri režiim Paranoiline?',
    'settings.update.paranoidBlocked': 'Tulemüüri režiim Paranoiline blokeerib online-uuendused',
    'settings.device.hidOnlyDesc':
      'Parandab ühilduvust hostiga, kui hiir või klaviatuur lakkab reageerimast',
    'mouse.hidOnly.desc':
      'Kui hiir või klaviatuur lakkab reageerimast ning HID lähtestamine ei aita, võib tegu olla NanoKVM-i ja hosti ühilduvusprobleemiga.',
    'settings.device.hidOnlyTip':
      'HID-Only režiim lõpetab virtuaalseadmete emuleerimise ja säilitab ainult põhilise HID juhtimise'
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
      'Päivitä sovellus versioon {{version}} ennen tämän järjestelmäpäivityksen asentamista.',
    'settings.update.system.requiredAppVersion': 'Vaadittu sovellusversio',
    'settings.device.diskCancelMount':
      'Virtuaalilevyn käyttöönotto peruu liitetyn levykuvan. Jatketaanko?',
    'image.diskOnWarn':
      'Levykuvan liittäminen sammuttaa virtuaalilevyn, joten tietokone ei enää pääse hakemistoon /data. Jatketaanko?',
    'image.diskOffWarn':
      'Virtuaalilevy on pois päältä ja se on otettava käyttöön levykuvan liittämiseksi. Tietokoneen USB-laitteet tunnistetaan uudelleen. Jatketaanko?',
    'download.diskShared': 'Sammuta ensin virtuaalilevy ja käytä sitten levykuvan latausta.',
    'download.diskOff': 'Sammuta virtuaalilevy',
    'settings.device.diskLocked':
      'Pois päältä, kun levykuva on liitettynä (käyttöönotto peruu liitoksen)',
    'screen.webrtcConnectionFailed.title': 'WebRTC-yhteys epäonnistui',
    'screen.webrtcConnectionFailed.description': 'Tarkista verkkoyhteys tai vaihda videotilaa.',
    'download.mountedImage':
      'Tämä levykuva on liitettynä. Irrota se ennen samannimisen tiedoston lähettämistä.',
    'download.sha256': 'SHA-256 (valinnainen)',
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
      'Tilat Rajoitettu ja Paranoidi ovat pois käytöstä, kunnes HTTPS otetaan käyttöön kohdassa Asetukset > Järjestelmä > Verkko.',
    'settings.system.firewall.mode.baselineDesc':
      'Avoin hallittu profiili. Säilyttää normaalin NanoKVM-yhteyden ilman lähdealueiden suodatusta.',
    'settings.system.firewall.mode.moderateDesc':
      'Oletusprofiili. Säilyttää tilan Perus palvelut, mutta hyväksyy uudet saapuvat yhteydet vain yksityisistä, ULA-, link-local- tai loopback-alueista.',
    'settings.system.firewall.mode.paranoidDesc':
      'Vain paikallinen HTTPS-yhteys. Estää SSH:n, HTTP:n, verkkopäivitykset ja muut lähtevän liikenteen verkko-ominaisuudet.',
    'settings.system.firewall.mode.current': 'Nykyinen',
    'settings.system.firewall.mode.default': 'Oletus',
    'settings.system.firewall.mode.localOnly': 'Vain paikallinen',
    'settings.system.firewall.mode.openTag': 'Avoin',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS vaaditaan',
    'settings.system.firewall.mode.outboundOpen': 'Lähtevä avoin',
    'settings.system.firewall.mode.outboundLimited': 'Lähtevä rajoitettu',
    'settings.system.firewall.mode.httpsOnly': 'Vain HTTPS',
    'settings.system.firewall.moderate.apply': 'Siirry tilaan Kohtuullinen',
    'settings.system.firewall.moderate.active': 'Palomuuritila Kohtuullinen on käytössä',
    'settings.system.firewall.moderate.allows':
      'Saapuvat yhteydet hyväksytään vain yksityisistä IPv4-, IPv4 link-local/loopback-, IPv6 ULA-, IPv6 link-local- tai IPv6 loopback -lähdealueista. Lähtevä liikenne pysyy avoimena.',
    'settings.system.firewall.baseline.apply': 'Siirry tilaan Perus',
    'settings.system.firewall.baseline.active': 'Palomuuritila Perus on käytössä',
    'settings.system.firewall.baseline.allows':
      'Palomuuripalvelu on käytössä, mutta saapuvien yhteyksien lähdealueita ei rajoiteta. Käytä tätä vain luotetuissa laboratorio- tai yhteensopivuustilanteissa.',
    'settings.system.firewall.baseline.confirmTitle': 'Siirrytäänkö avoimeen tilaan Perus?',
    'settings.system.firewall.baseline.confirmDesc':
      'Palomuuripalvelu pysyy käytössä, mutta vain paikallisiin lähdealueisiin rajoittava sääntö poistuu. Julkiset lähdealueet voivat tavoittaa NanoKVM:n julkaistut palvelut, jos verkko reitittää ne.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC on poistettu käytöstä palomuuritiloissa Rajoitettu ja Paranoidi',
    'settings.system.firewall.mode.description':
      'Valitse, miten saapuva ylläpitoyhteys sallitaan. Kohtuullinen on oletuksena käytettävä vain paikallinen profiili; Rajoitettu pitää HTTPS/SSH-yhteydet paikallisina ja estää WebRTC:n; Perus on avoin yhteensopivuusprofiili.',
    'settings.system.firewall.mode.baseline': 'Perus',
    'settings.system.firewall.mode.moderate': 'Kohtuullinen',
    'settings.system.firewall.mode.restricted': 'Rajoitettu',
    'settings.system.firewall.mode.paranoid': 'Paranoidi',
    'settings.system.firewall.restricted.enable': 'Ota Rajoitettu käyttöön',
    'settings.system.firewall.restricted.active': 'Palomuuritila Rajoitettu on käytössä',
    'settings.system.firewall.restricted.confirmTitle':
      'Otetaanko palomuuritila Rajoitettu käyttöön?',
    'settings.system.firewall.paranoid.enable': 'Ota Paranoidi käyttöön',
    'settings.system.firewall.paranoid.active': 'Palomuuritila Paranoidi on käytössä',
    'settings.system.firewall.paranoid.confirmTitle': 'Otetaanko palomuuritila Paranoidi käyttöön?',
    'settings.update.paranoidBlocked': 'Palomuuritila Paranoidi estää verkkopäivitykset',
    'settings.device.hidOnlyDesc':
      'Parantaa yhteensopivuutta isäntälaitteen kanssa, jos hiiri tai näppäimistö lakkaa reagoimasta',
    'mouse.hidOnly.desc':
      'Jos hiiri tai näppäimistö lakkaa reagoimasta eikä HID:n nollaus auta, kyseessä voi olla NanoKVM:n ja isäntälaitteen yhteensopivuusongelma.',
    'settings.device.hidOnlyTip':
      'HID-Only-tila lopettaa virtuaalilaitteiden emuloinnin ja säilyttää vain perus-HID-ohjauksen'
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
    'power.powerShort': 'Alimentation (appui court)',
    'power.powerLong': 'Alimentation (appui long)',
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
      "Mettez l'application à jour vers {{version}} avant d'installer cette mise à jour système.",
    'settings.update.system.requiredAppVersion': "Version d'application requise",
    'settings.system.firewall.enableHttpsFirst':
      "Activez HTTPS avant d'activer le mode pare-feu Restreint ou Paranoïaque",
    'settings.system.firewall.httpsRequired':
      "Les modes Restreint et Paranoïaque sont désactivés tant que HTTPS n'est pas activé dans Paramètres > Système > Réseau.",
    'settings.system.firewall.mode.baselineDesc':
      "Profil ouvert et géré. Conserve l'accès normal à NanoKVM sans filtrage par plages sources.",
    'settings.system.firewall.mode.moderateDesc':
      "Profil par défaut. Conserve les services de Base, mais n'accepte de nouvelles connexions entrantes que depuis des plages privées, ULA, link-local ou loopback.",
    'settings.system.firewall.mode.paranoidDesc':
      'Accès HTTPS local uniquement. Bloque SSH, HTTP, les mises à jour en ligne et les autres fonctions réseau sortantes.',
    'settings.system.firewall.mode.current': 'Actuel',
    'settings.system.firewall.mode.default': 'Par défaut',
    'settings.system.firewall.mode.localOnly': 'Local uniquement',
    'settings.system.firewall.mode.openTag': 'Ouvert',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS requis',
    'settings.system.firewall.mode.outboundOpen': 'Sortant ouvert',
    'settings.system.firewall.mode.outboundLimited': 'Sortant limité',
    'settings.system.firewall.mode.httpsOnly': 'HTTPS uniquement',
    'settings.system.firewall.moderate.apply': 'Passer à Modéré',
    'settings.system.firewall.moderate.active': 'Le mode pare-feu Modéré est actif',
    'settings.system.firewall.moderate.allows':
      "Les connexions entrantes ne sont acceptées que depuis les plages sources IPv4 privées, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local ou IPv6 loopback. L'accès sortant reste ouvert.",
    'settings.system.firewall.baseline.apply': 'Passer à Base',
    'settings.system.firewall.baseline.active': 'Le mode pare-feu Base est actif',
    'settings.system.firewall.baseline.allows':
      'Le service de pare-feu est actif, mais les plages sources entrantes ne sont pas restreintes. À utiliser uniquement dans des environnements de laboratoire de confiance ou pour la compatibilité.',
    'settings.system.firewall.baseline.confirmTitle': 'Passer au mode Base ouvert ?',
    'settings.system.firewall.baseline.confirmDesc':
      'Le service de pare-feu reste actif, mais la restriction aux plages sources locales est supprimée. Des plages sources publiques peuvent atteindre les services exposés de NanoKVM si le réseau les route.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC est désactivé dans les modes de pare-feu Restreint et Paranoïaque',
    'settings.system.firewall.mode.description':
      'Choisissez comment l’accès administrateur entrant est exposé. Modéré est le profil local par défaut; Restreint garde HTTPS/SSH en local et bloque WebRTC; Base est un profil ouvert de compatibilité.',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Modéré',
    'settings.system.firewall.mode.restricted': 'Restreint',
    'settings.system.firewall.mode.paranoid': 'Paranoïaque',
    'settings.system.firewall.restricted.enable': 'Activer Restreint',
    'settings.system.firewall.restricted.active': 'Le mode pare-feu Restreint est actif',
    'settings.system.firewall.restricted.confirmTitle': 'Activer le mode Restreint?',
    'settings.system.firewall.paranoid.enable': 'Activer Paranoïaque',
    'settings.system.firewall.paranoid.active': 'Le mode pare-feu Paranoïaque est actif',
    'settings.system.firewall.paranoid.confirmTitle': 'Activer le mode Paranoïaque?',
    'settings.update.paranoidBlocked':
      'Les mises à jour en ligne sont bloquées par le mode pare-feu Paranoïaque',
    'settings.device.hidOnlyDesc':
      'Améliore la compatibilité avec l’hôte si la souris ou le clavier ne répondent plus',
    'mouse.hidOnly.desc':
      'Si la souris ou le clavier ne répondent plus et que la réinitialisation du HID n’y change rien, il peut s’agir d’un problème de compatibilité entre le NanoKVM et l’hôte.',
    'settings.device.hidOnlyTip':
      'Le mode HID-Only cesse d’émuler les périphériques virtuels et ne conserve que le contrôle HID de base'
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
      'Az alkalmazást frissítse a(z) {{version}} verzióra a rendszerfrissítés telepítése előtt.',
    'settings.update.system.requiredAppVersion': 'Szükséges alkalmazásverzió',
    'settings.device.diskDesc': 'SD-kártya csatlakoztatása a távoli gazdagéphez',
    'settings.device.diskCancelMount':
      'A virtuális lemez engedélyezése megszakítja a csatlakoztatott képfájlt. Folytatja?',
    'image.diskOnWarn':
      'A képfájl csatlakoztatása kikapcsolja a virtuális lemezt, így a számítógép többé nem fér hozzá a /data könyvtárhoz. Folytatja?',
    'image.diskOffWarn':
      'A virtuális lemez ki van kapcsolva, és a képfájl csatlakoztatásához engedélyezni kell. A számítógép USB-eszközei újra felismerésre kerülnek. Folytatja?',
    'download.diskShared':
      'Először kapcsolja ki a virtuális lemezt, majd használja a képfájl-letöltést.',
    'download.diskOff': 'Virtuális lemez kikapcsolása',
    'settings.device.diskLocked':
      'Kikapcsolva, amíg egy képfájl csatlakoztatva van (bekapcsolása megszakítja a csatlakoztatást)',
    'settings.tailscale.memory.tip':
      'Ha a memóriahasználat meghaladja a korlátot, a szemétgyűjtés agresszívebben fut, hogy memóriát szabadítson fel. A módosítás érvénybe lépéséhez újra kell indítani a Tailscale-t.',
    'settings.tailscale.restart': 'Újraindítja a Tailscale-t?',
    'settings.tailscale.stop': 'Leállítja a Tailscale-t?',
    'settings.tailscale.stopDesc':
      'Kijelentkezteti a Tailscale-t, és letiltja az automatikus indítását rendszerindításkor.',
    'settings.tailscale.okBtn': 'Igen',
    'settings.tailscale.cancelBtn': 'Nem',
    'wifi.success': 'Menjen az eszközhöz, és ellenőrizze a NanoKVM hálózati állapotát.',
    'settings.system.firewall.enableHttpsFirst':
      'A Korlátozott vagy Paranoid tűzfalmód engedélyezése előtt engedélyezze a HTTPS-t',
    'settings.system.firewall.httpsRequired':
      'A Korlátozott és Paranoid mód le van tiltva, amíg a HTTPS nincs engedélyezve a Beállítások > Rendszer > Hálózat alatt.',
    'settings.system.firewall.mode.baselineDesc':
      'Nyitott, felügyelt profil. Megtartja a NanoKVM szokásos elérését forrástartomány-szűrés nélkül.',
    'settings.system.firewall.mode.moderateDesc':
      'Alapértelmezett profil. Megtartja az Alap szolgáltatásait, de új bejövő kapcsolatokat csak privát, ULA, link-local vagy loopback tartományokból fogad el.',
    'settings.system.firewall.mode.paranoidDesc':
      'Csak helyi HTTPS-hozzáférés. Blokkolja az SSH-t, a HTTP-t, az online frissítéseket és a többi kimenő hálózati funkciót.',
    'settings.system.firewall.mode.current': 'Jelenlegi',
    'settings.system.firewall.mode.default': 'Alapértelmezett',
    'settings.system.firewall.mode.localOnly': 'Csak helyi',
    'settings.system.firewall.mode.openTag': 'Nyitott',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS szükséges',
    'settings.system.firewall.mode.outboundOpen': 'Kimenő nyitott',
    'settings.system.firewall.mode.outboundLimited': 'Kimenő korlátozott',
    'settings.system.firewall.mode.httpsOnly': 'Csak HTTPS',
    'settings.system.firewall.moderate.apply': 'Váltás Mérsékelt módra',
    'settings.system.firewall.moderate.active': 'A Mérsékelt tűzfalmód aktív',
    'settings.system.firewall.moderate.allows':
      'A bejövő kapcsolatok csak privát IPv4, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local vagy IPv6 loopback forrástartományokból fogadhatók el. A kimenő hozzáférés nyitva marad.',
    'settings.system.firewall.baseline.apply': 'Váltás Alap módra',
    'settings.system.firewall.baseline.active': 'Az Alap tűzfalmód aktív',
    'settings.system.firewall.baseline.allows':
      'A tűzfalszolgáltatás aktív, de a bejövő forrástartományok nincsenek korlátozva. Csak megbízható labor- vagy kompatibilitási környezetben használja.',
    'settings.system.firewall.baseline.confirmTitle': 'Átvált a nyitott Alap módra?',
    'settings.system.firewall.baseline.confirmDesc':
      'A tűzfalszolgáltatás aktív marad, de megszűnik a csak helyi forrástartományokra vonatkozó korlátozás. A nyilvános forrástartományok elérhetik a NanoKVM nyilvános szolgáltatásait, ha a hálózat továbbítja őket.',
    'screen.videoWebrtcBlockedByFirewall':
      'A H.264 WebRTC le van tiltva Korlátozott és Paranoid tűzfal módban',
    'settings.system.firewall.mode.description':
      'Válassza ki, hogyan legyen elérhető a bejövő adminisztrációs hozzáférés. A Mérsékelt az alapértelmezett helyi profil; a Korlátozott helyben tartja a HTTPS/SSH-t és blokkolja a WebRTC-t; az Alap nyílt kompatibilitási profil.',
    'settings.system.firewall.mode.baseline': 'Alap',
    'settings.system.firewall.mode.moderate': 'Mérsékelt',
    'settings.system.firewall.mode.restricted': 'Korlátozott',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Korlátozott engedélyezése',
    'settings.system.firewall.restricted.active': 'A Korlátozott tűzfal mód aktív',
    'settings.system.firewall.restricted.confirmTitle': 'Engedélyezi a Korlátozott módot?',
    'settings.system.firewall.paranoid.enable': 'Paranoid engedélyezése',
    'settings.system.firewall.paranoid.active': 'A Paranoid tűzfalmód aktív',
    'settings.system.firewall.paranoid.confirmTitle': 'Engedélyezi a Paranoid módot?',
    'settings.update.paranoidBlocked': 'Az online frissítéseket a Paranoid tűzfalmód blokkolja',
    'settings.device.hidOnlyDesc':
      'Javítja a gazdagéppel való kompatibilitást, ha az egér vagy a billentyűzet nem válaszol',
    'mouse.hidOnly.desc':
      'Ha az egér vagy a billentyűzet nem válaszol, és a HID alaphelyzetbe állítása nem segít, a NanoKVM és a gazdagép közötti kompatibilitási probléma állhat fenn.',
    'settings.device.hidOnlyTip':
      'A HID-Only mód leállítja a virtuális eszközök emulálását, és csak az alapvető HID vezérlést tartja meg'
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
    'power.powerShort': 'Daya (tekan sebentar)',
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
      'Perbarui aplikasi ke {{version}} sebelum memasang pembaruan sistem ini.',
    'settings.update.system.requiredAppVersion': 'Versi aplikasi yang diperlukan',
    'settings.device.diskDesc': 'Pasang kartu SD pada host jarak jauh',
    'settings.device.diskCancelMount':
      'Mengaktifkan disk virtual akan membatalkan image yang terpasang. Lanjutkan?',
    'image.diskOnWarn':
      'Memasang image akan mematikan disk virtual, sehingga komputer tidak lagi dapat mengakses /data. Lanjutkan?',
    'image.diskOffWarn':
      'Disk virtual sedang mati dan harus diaktifkan untuk memasang image. Perangkat USB pada komputer akan dienumerasi ulang. Lanjutkan?',
    'download.diskShared': 'Matikan disk virtual terlebih dahulu, lalu gunakan unduhan image.',
    'download.diskOff': 'Matikan disk virtual',
    'settings.device.diskLocked':
      'Mati saat image terpasang (mengaktifkannya membatalkan pemasangan)',
    'settings.tailscale.memory.tip':
      'Saat penggunaan memori melebihi batas, garbage collection dijalankan lebih agresif untuk membebaskan memori. Tailscale perlu dimulai ulang agar perubahan berlaku.',
    'settings.tailscale.restart': 'Mulai ulang Tailscale?',
    'settings.tailscale.stop': 'Hentikan Tailscale?',
    'settings.tailscale.stopDesc':
      'Keluar dari Tailscale dan menonaktifkan startup otomatisnya saat boot.',
    'settings.tailscale.okBtn': 'Ya',
    'settings.tailscale.cancelBtn': 'Tidak',
    'wifi.success': 'Silakan periksa status jaringan NanoKVM langsung pada perangkat.',
    'settings.system.firewall.enableHttpsFirst':
      'Aktifkan HTTPS sebelum mengaktifkan mode firewall Terbatas atau Paranoid',
    'settings.system.firewall.httpsRequired':
      'Mode Terbatas dan Paranoid dinonaktifkan sampai HTTPS diaktifkan di Pengaturan > Sistem > Jaringan.',
    'settings.system.firewall.mode.baselineDesc':
      'Profil terkelola terbuka. Mempertahankan akses NanoKVM normal tanpa pemfilteran rentang sumber.',
    'settings.system.firewall.mode.moderateDesc':
      'Profil default. Mempertahankan layanan Dasar, tetapi hanya menerima koneksi masuk baru dari rentang privat, ULA, link-local, atau loopback.',
    'settings.system.firewall.mode.paranoidDesc':
      'Akses HTTPS khusus lokal. Memblokir SSH, HTTP, pembaruan online, dan fitur jaringan keluar lainnya.',
    'settings.system.firewall.mode.current': 'Saat ini',
    'settings.system.firewall.mode.default': 'Default',
    'settings.system.firewall.mode.localOnly': 'Khusus lokal',
    'settings.system.firewall.mode.openTag': 'Terbuka',
    'settings.system.firewall.mode.httpsRequiredTag': 'Perlu HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Keluar terbuka',
    'settings.system.firewall.mode.outboundLimited': 'Keluar terbatas',
    'settings.system.firewall.mode.httpsOnly': 'Hanya HTTPS',
    'settings.system.firewall.moderate.apply': 'Beralih ke Sedang',
    'settings.system.firewall.moderate.active': 'Mode firewall Sedang aktif',
    'settings.system.firewall.moderate.allows':
      'Koneksi masuk hanya diterima dari rentang sumber IPv4 privat, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local, atau IPv6 loopback. Akses keluar tetap terbuka.',
    'settings.system.firewall.baseline.apply': 'Beralih ke Dasar',
    'settings.system.firewall.baseline.active': 'Mode firewall Dasar aktif',
    'settings.system.firewall.baseline.allows':
      'Layanan firewall aktif, tetapi rentang sumber masuk tidak dibatasi. Gunakan hanya untuk lingkungan lab tepercaya atau skenario kompatibilitas.',
    'settings.system.firewall.baseline.confirmTitle': 'Beralih ke mode Dasar terbuka?',
    'settings.system.firewall.baseline.confirmDesc':
      'Layanan firewall tetap aktif, tetapi pembatasan rentang sumber khusus lokal dihapus. Rentang sumber publik dapat menjangkau layanan NanoKVM yang terbuka jika jaringan merutekannya.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC dinonaktifkan dalam mode firewall Terbatas dan Paranoid',
    'settings.system.firewall.mode.description':
      'Pilih bagaimana akses admin masuk diekspos. Sedang adalah profil lokal bawaan; Terbatas membuat HTTPS/SSH hanya lokal dan memblokir WebRTC; Dasar adalah profil kompatibilitas terbuka.',
    'settings.system.firewall.mode.baseline': 'Dasar',
    'settings.system.firewall.mode.moderate': 'Sedang',
    'settings.system.firewall.mode.restricted': 'Terbatas',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Aktifkan Terbatas',
    'settings.system.firewall.restricted.active': 'Mode firewall Terbatas aktif',
    'settings.system.firewall.restricted.confirmTitle': 'Aktifkan mode Terbatas?',
    'settings.system.firewall.paranoid.enable': 'Aktifkan Paranoid',
    'settings.system.firewall.paranoid.active': 'Mode firewall Paranoid aktif',
    'settings.system.firewall.paranoid.confirmTitle': 'Aktifkan mode Paranoid?',
    'settings.update.paranoidBlocked': 'Pembaruan online diblokir oleh mode firewall Paranoid',
    'settings.device.hidOnlyDesc':
      'Meningkatkan kompatibilitas dengan host jika mouse atau keyboard berhenti merespons',
    'mouse.hidOnly.desc':
      'Jika mouse atau keyboard berhenti merespons dan mereset HID tidak membantu, mungkin ada masalah kompatibilitas antara NanoKVM dan host.',
    'settings.device.hidOnlyTip':
      'Mode HID-Only berhenti meniru perangkat virtual dan hanya mempertahankan kontrol dasar HID'
  },
  it: {
    'auth.illegalPassword':
      'La password deve contenere almeno 8 caratteri e non può contenere virgolette o barre',
    'screen.videoDirectTips':
      'Abilita HTTPS in "Impostazioni > Sistema > Rete" per utilizzare questa modalità',
    'download.disabled':
      "Al momento non è possibile scaricare né caricare immagini perché l'archiviazione non è scrivibile. Se un'immagine è montata, smontala e poi disattiva il disco virtuale per rendere di nuovo scrivibile l'archiviazione.",
    'image.unmountDesc':
      "Su alcuni sistemi è necessario espellere manualmente il disco dall'host remoto prima di smontare l'immagine.",
    'settings.device.hdmi.description': "Abilita l'uscita HDMI/monitor",
    'settings.device.ssh.description': "Abilita l'accesso remoto SSH",
    'picoclaw.empty': "Apri il pannello e avvia un'attività per iniziare.",
    'settings.tailscale.run': 'Avvia',
    'settings.update.paranoidBlocked':
      'Gli aggiornamenti online sono bloccati dalla modalità firewall Paranoica',
    'image.tips.usb2':
      'Assicurati che il disco virtuale sia montato (Impostazioni - Disco virtuale).',
    'image.tips.usb3':
      'Apri il disco virtuale sul tuo computer e copia il file immagine nella directory principale del disco.',
    'keyboard.shortcut.capture': 'Fai clic qui per acquisire la scorciatoia',
    'keyboard.leaderKey.desc':
      "Ignora le restrizioni del browser e invia le scorciatoie di sistema direttamente all'host remoto.",
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
      "Aggiorna l'applicazione alla versione {{version}} prima di installare questo aggiornamento di sistema.",
    'settings.update.system.requiredAppVersion': 'Versione applicazione richiesta',
    'settings.device.diskDesc': "Monta la scheda SD sull'host remoto",
    'settings.device.diskCancelMount':
      "Abilitare il disco virtuale annulla l'immagine montata. Continuare?",
    'image.diskOnWarn':
      "Montare l'immagine disattiva il disco virtuale, quindi il computer non potrà più accedere a /data. Continuare?",
    'image.diskOffWarn':
      "Il disco virtuale è disattivato e deve essere abilitato per montare l'immagine. I dispositivi USB sul computer vengono enumerati di nuovo. Continuare?",
    'download.diskShared': 'Disattiva prima il disco virtuale, poi usa il download delle immagini.',
    'download.diskOff': 'Disattiva il disco virtuale',
    'settings.device.diskLocked':
      "Disattivato mentre un'immagine è montata (attivarlo annulla il montaggio)",
    'settings.tailscale.memory.tip':
      "Quando l'uso della memoria supera il limite, la garbage collection viene eseguita in modo più aggressivo per liberare memoria. Per applicare la modifica è necessario riavviare Tailscale.",
    'settings.tailscale.restart': 'Riavviare Tailscale?',
    'settings.tailscale.stop': 'Arrestare Tailscale?',
    'settings.tailscale.stopDesc':
      "Esegue il logout da Tailscale e disattiva l'avvio automatico all'accensione.",
    'settings.tailscale.okBtn': 'Sì',
    'wifi.success': 'Vai al dispositivo per controllare lo stato della rete di NanoKVM.',
    'settings.system.firewall.enableHttpsFirst':
      'Abilita HTTPS prima di abilitare la modalità firewall Ristretta o Paranoica',
    'settings.system.firewall.httpsRequired':
      'Le modalità Ristretta e Paranoica sono disattivate finché HTTPS non viene abilitato in Impostazioni > Sistema > Rete.',
    'settings.system.firewall.mode.baselineDesc':
      'Profilo aperto e gestito. Mantiene il normale accesso a NanoKVM senza filtrare per intervalli di origine.',
    'settings.system.firewall.mode.moderateDesc':
      'Profilo predefinito. Mantiene i servizi di Base, ma accetta nuove connessioni in ingresso solo da intervalli privati, ULA, link-local o loopback.',
    'settings.system.firewall.mode.paranoidDesc':
      'Accesso HTTPS solo locale. Blocca SSH, HTTP, gli aggiornamenti online e le altre funzioni di rete in uscita.',
    'settings.system.firewall.mode.current': 'Corrente',
    'settings.system.firewall.mode.default': 'Predefinito',
    'settings.system.firewall.mode.localOnly': 'Solo locale',
    'settings.system.firewall.mode.openTag': 'Aperto',
    'settings.system.firewall.mode.httpsRequiredTag': 'Richiede HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Uscita aperta',
    'settings.system.firewall.mode.outboundLimited': 'Uscita limitata',
    'settings.system.firewall.mode.httpsOnly': 'Solo HTTPS',
    'settings.system.firewall.moderate.apply': 'Passa a Moderata',
    'settings.system.firewall.moderate.active': 'La modalità firewall Moderata è attiva',
    'settings.system.firewall.moderate.allows':
      "Le connessioni in ingresso sono accettate solo da intervalli di origine IPv4 privati, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local o IPv6 loopback. L'accesso in uscita resta aperto.",
    'settings.system.firewall.baseline.apply': 'Passa a Base',
    'settings.system.firewall.baseline.active': 'La modalità firewall Base è attiva',
    'settings.system.firewall.baseline.allows':
      'Il servizio firewall è attivo, ma gli intervalli di origine in ingresso non sono limitati. Usalo solo in ambienti di laboratorio fidati o per compatibilità.',
    'settings.system.firewall.baseline.confirmTitle': 'Passare alla modalità Base aperta?',
    'settings.system.firewall.baseline.confirmDesc':
      'Il servizio firewall resta attivo, ma viene rimossa la restrizione ai soli intervalli di origine locali. Gli intervalli di origine pubblici possono raggiungere i servizi esposti di NanoKVM se la rete li instrada.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC è disattivato nelle modalità firewall Ristretta e Paranoica',
    'settings.system.firewall.mode.description':
      'Scegli come esporre l’accesso amministrativo in ingresso. Modalità Moderata è il profilo locale predefinito; Modalità Ristretta mantiene HTTPS/SSH solo locali e blocca WebRTC; Modalità Base è un profilo aperto di compatibilità.',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Moderata',
    'settings.system.firewall.mode.restricted': 'Ristretta',
    'settings.system.firewall.mode.paranoid': 'Paranoica',
    'settings.system.firewall.restricted.enable': 'Abilita Ristretta',
    'settings.system.firewall.restricted.active': 'La modalità firewall Ristretta è attiva',
    'settings.system.firewall.restricted.confirmTitle': 'Abilitare la modalità Ristretta?',
    'settings.system.firewall.paranoid.enable': 'Abilita Paranoica',
    'settings.system.firewall.paranoid.active': 'La modalità firewall Paranoica è attiva',
    'settings.system.firewall.paranoid.confirmTitle': 'Abilitare la modalità Paranoica?',
    'settings.device.hidOnlyDesc':
      "Migliora la compatibilità con l'host se mouse o tastiera smettono di rispondere",
    'mouse.hidOnly.desc':
      "Se mouse o tastiera smettono di rispondere e il ripristino dell'HID non aiuta, potrebbe trattarsi di un problema di compatibilità tra il NanoKVM e l'host.",
    'settings.device.hidOnlyTip':
      'La modalità HID-Only smette di emulare i dispositivi virtuali, mantenendo solo il controllo di base HID'
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
      'このシステム更新をインストールする前に、アプリケーションを {{version}} に更新してください。',
    'settings.update.system.requiredAppVersion': '必要なアプリケーションバージョン',
    'settings.system.firewall.enableHttpsFirst':
      '制限付きまたはパラノイドファイアウォールモードを有効にする前に HTTPS を有効にしてください',
    'settings.system.firewall.httpsRequired':
      'HTTPS が「設定 > システム > ネットワーク」で有効になるまで、制限付きモードとパラノイドモードは無効です。',
    'settings.system.firewall.mode.baselineDesc':
      'オープンな管理対象プロファイル。送信元範囲のフィルタリングなしで、通常の NanoKVM アクセスを維持します。',
    'settings.system.firewall.mode.moderateDesc':
      '既定のプロファイル。ベースラインのサービスを維持しつつ、新しい着信接続はプライベート、ULA、リンクローカル、ループバックの範囲からのみ受け付けます。',
    'settings.system.firewall.mode.paranoidDesc':
      'ローカル専用の HTTPS アクセス。SSH、HTTP、オンライン更新、その他の送信方向のネットワーク機能をブロックします。',
    'settings.system.firewall.mode.current': '現在',
    'settings.system.firewall.mode.default': '既定',
    'settings.system.firewall.mode.localOnly': 'ローカル専用',
    'settings.system.firewall.mode.openTag': 'オープン',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS が必要',
    'settings.system.firewall.mode.outboundOpen': '送信は開放',
    'settings.system.firewall.mode.outboundLimited': '送信は制限',
    'settings.system.firewall.mode.httpsOnly': 'HTTPS のみ',
    'settings.system.firewall.moderate.apply': '標準に切り替え',
    'settings.system.firewall.moderate.active': '標準ファイアウォールモードが有効です',
    'settings.system.firewall.moderate.allows':
      '着信接続は、プライベート IPv4、IPv4 リンクローカル/ループバック、IPv6 ULA、IPv6 リンクローカル、IPv6 ループバックの送信元範囲からのみ受け付けます。送信アクセスは開放されたままです。',
    'settings.system.firewall.baseline.apply': 'ベースラインに切り替え',
    'settings.system.firewall.baseline.active': 'ベースラインファイアウォールモードが有効です',
    'settings.system.firewall.baseline.allows':
      'ファイアウォールサービスは有効ですが、着信の送信元範囲は制限されません。信頼できる検証環境や互換性が必要な場合にのみ使用してください。',
    'settings.system.firewall.baseline.confirmTitle':
      'オープンなベースラインモードに切り替えますか?',
    'settings.system.firewall.baseline.confirmDesc':
      'ファイアウォールサービスは有効のままですが、ローカル専用の送信元範囲の制限が解除されます。ネットワークが経路を提供している場合、公開側の送信元範囲から NanoKVM の公開サービスに到達できる可能性があります。',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC は制限付き/パラノイドファイアウォールモードでは無効です',
    'settings.system.firewall.mode.description':
      '受信管理アクセスの公開方法を選択します。標準は既定のローカル専用プロファイルです。制限付きは HTTPS/SSH をローカル専用にし、WebRTC をブロックします。ベースラインは互換性用のオープンプロファイルです。',
    'settings.system.firewall.mode.baseline': 'ベースライン',
    'settings.system.firewall.mode.moderate': '標準',
    'settings.system.firewall.mode.restricted': '制限付き',
    'settings.system.firewall.mode.paranoid': 'パラノイド',
    'settings.system.firewall.restricted.enable': '制限付きを有効化',
    'settings.system.firewall.restricted.active': '制限付きファイアウォールモードが有効です',
    'settings.system.firewall.restricted.confirmTitle': '制限付きモードを有効にしますか?',
    'settings.system.firewall.paranoid.enable': 'パラノイドを有効化',
    'settings.system.firewall.paranoid.active': 'パラノイドファイアウォールモードが有効です',
    'settings.system.firewall.paranoid.confirmTitle': 'パラノイドモードを有効にしますか?',
    'settings.update.paranoidBlocked':
      'オンライン更新はパラノイドファイアウォールモードでブロックされています',
    'settings.device.hidOnlyDesc':
      'マウスやキーボードが反応しなくなった場合に、ホストとの互換性を高めます',
    'mouse.hidOnly.desc':
      'マウスやキーボードが反応しなくなり、HID のリセットでも改善しない場合は、NanoKVM とホストの互換性の問題かもしれません。',
    'settings.device.hidOnlyTip':
      'HID-Only モードでは仮想デバイスのエミュレーションを停止し、基本的な HID 制御のみを維持します'
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
    'auth.setupRecovery': '이 비밀번호를 잃어버리면 복구를 위해 SD 카드를 다시 기록해야 합니다.',
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
      '이 시스템 업데이트를 설치하기 전에 애플리케이션을 {{version}}(으)로 업데이트하세요.',
    'settings.update.system.requiredAppVersion': '필요한 애플리케이션 버전',
    'settings.system.firewall.enableHttpsFirst':
      '제한 또는 파라노이드 방화벽 모드를 활성화하기 전에 HTTPS를 활성화하세요',
    'settings.system.firewall.httpsRequired':
      '설정 > 시스템 > 네트워크에서 HTTPS를 활성화하기 전까지 제한 및 파라노이드 모드는 비활성화됩니다.',
    'settings.system.firewall.mode.baselineDesc':
      '개방형 관리 프로필입니다. 소스 범위 필터링 없이 일반적인 NanoKVM 접근을 유지합니다.',
    'settings.system.firewall.mode.moderateDesc':
      '기본 프로필입니다. 베이스라인 서비스를 유지하되, 새 인바운드 연결은 사설, ULA, 링크 로컬 또는 루프백 범위에서만 허용합니다.',
    'settings.system.firewall.mode.paranoidDesc':
      '로컬 전용 HTTPS 접근입니다. SSH, HTTP, 온라인 업데이트 및 기타 아웃바운드 네트워크 기능을 차단합니다.',
    'settings.system.firewall.mode.current': '현재',
    'settings.system.firewall.mode.default': '기본',
    'settings.system.firewall.mode.localOnly': '로컬 전용',
    'settings.system.firewall.mode.openTag': '개방',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS 필요',
    'settings.system.firewall.mode.outboundOpen': '아웃바운드 개방',
    'settings.system.firewall.mode.outboundLimited': '아웃바운드 제한',
    'settings.system.firewall.mode.httpsOnly': 'HTTPS만',
    'settings.system.firewall.moderate.apply': '보통으로 전환',
    'settings.system.firewall.moderate.active': '보통 방화벽 모드가 활성화되어 있습니다',
    'settings.system.firewall.moderate.allows':
      '인바운드 연결은 사설 IPv4, IPv4 링크 로컬/루프백, IPv6 ULA, IPv6 링크 로컬 또는 IPv6 루프백 소스 범위에서만 허용됩니다. 아웃바운드 접근은 계속 열려 있습니다.',
    'settings.system.firewall.baseline.apply': '베이스라인으로 전환',
    'settings.system.firewall.baseline.active': '베이스라인 방화벽 모드가 활성화되어 있습니다',
    'settings.system.firewall.baseline.allows':
      '방화벽 서비스는 활성화되어 있지만 인바운드 소스 범위는 제한되지 않습니다. 신뢰할 수 있는 실험실 환경이나 호환성이 필요한 경우에만 사용하세요.',
    'settings.system.firewall.baseline.confirmTitle': '개방형 베이스라인 모드로 전환할까요?',
    'settings.system.firewall.baseline.confirmDesc':
      '방화벽 서비스는 계속 활성화되지만 로컬 전용 소스 범위 제한이 해제됩니다. 네트워크가 라우팅하는 경우 공용 소스 범위에서 노출된 NanoKVM 서비스에 접근할 수 있습니다.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC는 제한 및 파라노이드 방화벽 모드에서 비활성화됩니다',
    'settings.system.firewall.mode.description':
      '수신 관리자 접근을 노출하는 방식을 선택합니다. 보통은 기본 로컬 전용 프로필입니다. 제한은 HTTPS/SSH를 로컬 전용으로 유지하고 WebRTC를 차단합니다. 베이스라인은 개방형 호환성 프로필입니다.',
    'settings.system.firewall.mode.baseline': '베이스라인',
    'settings.system.firewall.mode.moderate': '보통',
    'settings.system.firewall.mode.restricted': '제한',
    'settings.system.firewall.mode.paranoid': '파라노이드',
    'settings.system.firewall.restricted.enable': '제한 활성화',
    'settings.system.firewall.restricted.active': '제한 방화벽 모드가 활성화되었습니다',
    'settings.system.firewall.restricted.confirmTitle': '제한 모드를 활성화할까요?',
    'settings.system.firewall.paranoid.enable': '파라노이드 활성화',
    'settings.system.firewall.paranoid.active': '파라노이드 방화벽 모드가 활성화되었습니다',
    'settings.system.firewall.paranoid.confirmTitle': '파라노이드 모드를 활성화할까요?',
    'settings.update.paranoidBlocked': '온라인 업데이트는 파라노이드 방화벽 모드에서 차단됩니다',
    'settings.device.hidOnlyDesc':
      '마우스나 키보드가 응답하지 않을 때 호스트와의 호환성을 높입니다',
    'mouse.hidOnly.desc':
      '마우스나 키보드가 응답하지 않고 HID를 재설정해도 해결되지 않으면 NanoKVM과 호스트 간의 호환성 문제일 수 있습니다.',
    'settings.device.hidOnlyTip':
      'HID-Only 모드는 가상 장치 에뮬레이션을 중지하고 기본 HID 제어만 유지합니다'
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
      'Oppdater applikasjonen til {{version}} før du installerer denne systemoppdateringen.',
    'settings.update.system.requiredAppVersion': 'Påkrevd applikasjonsversjon',
    'settings.device.diskDesc': 'Monter SD-kortet på den eksterne verten',
    'settings.device.diskCancelMount':
      'Hvis du aktiverer den virtuelle disken, avbrytes det monterte bildet. Fortsette?',
    'image.diskOnWarn':
      'Når bildet monteres, slås den virtuelle disken av, slik at datamaskinen ikke lenger får tilgang til /data. Fortsette?',
    'image.diskOffWarn':
      'Den virtuelle disken er av og må aktiveres for å montere bildet. USB-enhetene på datamaskinen registreres på nytt. Fortsette?',
    'download.diskShared': 'Slå først av den virtuelle disken, og bruk deretter bildenedlastingen.',
    'download.diskOff': 'Slå av den virtuelle disken',
    'settings.device.diskLocked': 'Av mens et bilde er montert (aktivering avbryter monteringen)',
    'settings.tailscale.memory.tip':
      'Når minnebruken overskrider grensen, kjøres garbage collection mer aggressivt for å frigjøre minne. Tailscale må startes på nytt for at endringen skal tre i kraft.',
    'settings.tailscale.restart': 'Starte Tailscale på nytt?',
    'settings.tailscale.stop': 'Stoppe Tailscale?',
    'settings.tailscale.stopDesc':
      'Logger ut av Tailscale og deaktiverer automatisk oppstart ved boot.',
    'settings.tailscale.okBtn': 'Ja',
    'settings.tailscale.cancelBtn': 'Nei',
    'wifi.success': 'Gå til enheten og kontroller nettverksstatusen til NanoKVM.',
    'settings.system.firewall.enableHttpsFirst':
      'Aktiver HTTPS før du aktiverer brannmurmodusen Begrenset eller Paranoid',
    'settings.system.firewall.httpsRequired':
      'Modusene Begrenset og Paranoid er deaktivert til HTTPS er aktivert under Innstillinger > System > Nettverk.',
    'settings.system.firewall.mode.baselineDesc':
      'Åpen administrert profil. Beholder normal tilgang til NanoKVM uten filtrering på kildeområder.',
    'settings.system.firewall.mode.moderateDesc':
      'Standardprofil. Beholder Basis-tjenestene, men godtar bare nye innkommende tilkoblinger fra private, ULA-, link-local- eller loopback-områder.',
    'settings.system.firewall.mode.paranoidDesc':
      'Kun lokal HTTPS-tilgang. Blokkerer SSH, HTTP, nettbaserte oppdateringer og andre utgående nettverksfunksjoner.',
    'settings.system.firewall.mode.current': 'Gjeldende',
    'settings.system.firewall.mode.default': 'Standard',
    'settings.system.firewall.mode.localOnly': 'Kun lokalt',
    'settings.system.firewall.mode.openTag': 'Åpen',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS kreves',
    'settings.system.firewall.mode.outboundOpen': 'Utgående åpen',
    'settings.system.firewall.mode.outboundLimited': 'Utgående begrenset',
    'settings.system.firewall.mode.httpsOnly': 'Kun HTTPS',
    'settings.system.firewall.moderate.apply': 'Bytt til Moderat',
    'settings.system.firewall.moderate.active': 'Brannmurmodusen Moderat er aktiv',
    'settings.system.firewall.moderate.allows':
      'Innkommende tilkoblinger godtas bare fra private IPv4-, IPv4 link-local/loopback-, IPv6 ULA-, IPv6 link-local- eller IPv6 loopback-kildeområder. Utgående tilgang forblir åpen.',
    'settings.system.firewall.baseline.apply': 'Bytt til Basis',
    'settings.system.firewall.baseline.active': 'Brannmurmodusen Basis er aktiv',
    'settings.system.firewall.baseline.allows':
      'Brannmurtjenesten er aktiv, men innkommende kildeområder er ikke begrenset. Bruk dette bare i pålitelige laboratorie- eller kompatibilitetsscenarier.',
    'settings.system.firewall.baseline.confirmTitle': 'Bytte til åpen Basis-modus?',
    'settings.system.firewall.baseline.confirmDesc':
      'Brannmurtjenesten forblir aktiv, men begrensningen til lokale kildeområder fjernes. Offentlige kildeområder kan nå eksponerte NanoKVM-tjenester hvis nettverket ruter dem.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC er deaktivert i brannmurmodusene Begrenset og Paranoid',
    'settings.system.firewall.mode.description':
      'Velg hvordan innkommende administratortilgang eksponeres. Moderat er standard lokal profil; Begrenset holder HTTPS/SSH lokalt og blokkerer WebRTC; Basis er en åpen kompatibilitetsprofil.',
    'settings.system.firewall.mode.baseline': 'Basis',
    'settings.system.firewall.mode.moderate': 'Moderat',
    'settings.system.firewall.mode.restricted': 'Begrenset',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Aktiver Begrenset',
    'settings.system.firewall.restricted.active': 'Brannmurmodusen Begrenset er aktiv',
    'settings.system.firewall.restricted.confirmTitle': 'Aktivere brannmurmodusen Begrenset?',
    'settings.system.firewall.paranoid.enable': 'Aktiver Paranoid',
    'settings.system.firewall.paranoid.active': 'Brannmurmodusen Paranoid er aktiv',
    'settings.system.firewall.paranoid.confirmTitle': 'Aktivere brannmurmodusen Paranoid?',
    'settings.update.paranoidBlocked': 'Onlineoppdateringer blokkeres av brannmurmodusen Paranoid',
    'settings.device.hidOnlyDesc':
      'Forbedrer kompatibiliteten med verten hvis musen eller tastaturet slutter å svare',
    'mouse.hidOnly.desc':
      'Hvis musen eller tastaturet slutter å svare og det ikke hjelper å tilbakestille HID, kan det være et kompatibilitetsproblem mellom NanoKVM og verten.',
    'settings.device.hidOnlyTip':
      'HID-Only-modus slutter å emulere virtuelle enheter og beholder bare grunnleggende HID-kontroll'
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
      'Werk de applicatie bij naar {{version}} voordat u deze systeemupdate installeert.',
    'settings.update.system.requiredAppVersion': 'Vereiste applicatieversie',
    'settings.system.firewall.enableHttpsFirst':
      'Schakel HTTPS in voordat u de firewallmodus Beperkt of Paranoïde inschakelt',
    'settings.system.firewall.httpsRequired':
      'De modi Beperkt en Paranoïde zijn uitgeschakeld totdat HTTPS is ingeschakeld bij Instellingen > Systeem > Netwerk.',
    'settings.system.firewall.mode.baselineDesc':
      'Open beheerd profiel. Behoudt de normale NanoKVM-toegang zonder filtering op bronbereiken.',
    'settings.system.firewall.mode.moderateDesc':
      'Standaardprofiel. Behoudt de Basis-diensten, maar accepteert nieuwe inkomende verbindingen alleen vanuit privé-, ULA-, link-local- of loopbackbereiken.',
    'settings.system.firewall.mode.paranoidDesc':
      'Alleen lokale HTTPS-toegang. Blokkeert SSH, HTTP, online updates en andere uitgaande netwerkfuncties.',
    'settings.system.firewall.mode.current': 'Huidig',
    'settings.system.firewall.mode.default': 'Standaard',
    'settings.system.firewall.mode.localOnly': 'Alleen lokaal',
    'settings.system.firewall.mode.openTag': 'Open',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS vereist',
    'settings.system.firewall.mode.outboundOpen': 'Uitgaand open',
    'settings.system.firewall.mode.outboundLimited': 'Uitgaand beperkt',
    'settings.system.firewall.mode.httpsOnly': 'Alleen HTTPS',
    'settings.system.firewall.moderate.apply': 'Overschakelen naar Gematigd',
    'settings.system.firewall.moderate.active': 'Firewallmodus Gematigd is actief',
    'settings.system.firewall.moderate.allows':
      'Inkomende verbindingen worden alleen geaccepteerd vanuit privé-IPv4-, IPv4-link-local/loopback-, IPv6-ULA-, IPv6-link-local- of IPv6-loopbackbronbereiken. Uitgaande toegang blijft open.',
    'settings.system.firewall.baseline.apply': 'Overschakelen naar Basis',
    'settings.system.firewall.baseline.active': 'Firewallmodus Basis is actief',
    'settings.system.firewall.baseline.allows':
      "De firewalldienst is actief, maar inkomende bronbereiken zijn niet beperkt. Gebruik dit alleen in vertrouwde lab- of compatibiliteitsscenario's.",
    'settings.system.firewall.baseline.confirmTitle': 'Overschakelen naar de open modus Basis?',
    'settings.system.firewall.baseline.confirmDesc':
      'De firewalldienst blijft actief, maar de beperking tot lokale bronbereiken vervalt. Openbare bronbereiken kunnen blootgestelde NanoKVM-diensten bereiken als het netwerk ze routeert.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC is uitgeschakeld in de firewallmodi Beperkt en Paranoïde',
    'settings.system.firewall.mode.description':
      'Kies hoe inkomende beheerstoegang wordt aangeboden. Gematigd is het standaard lokale profiel; Beperkt houdt HTTPS/SSH lokaal en blokkeert WebRTC; Basis is een open compatibiliteitsprofiel.',
    'settings.system.firewall.mode.baseline': 'Basis',
    'settings.system.firewall.mode.moderate': 'Gematigd',
    'settings.system.firewall.mode.restricted': 'Beperkt',
    'settings.system.firewall.mode.paranoid': 'Paranoïde',
    'settings.system.firewall.restricted.enable': 'Beperkt inschakelen',
    'settings.system.firewall.restricted.active': 'Firewallmodus Beperkt is actief',
    'settings.system.firewall.restricted.confirmTitle': 'Firewallmodus Beperkt inschakelen?',
    'settings.system.firewall.paranoid.enable': 'Paranoïde inschakelen',
    'settings.system.firewall.paranoid.active': 'Firewallmodus Paranoïde is actief',
    'settings.system.firewall.paranoid.confirmTitle': 'Firewallmodus Paranoïde inschakelen?',
    'settings.update.paranoidBlocked':
      'Online-updates worden geblokkeerd door firewallmodus Paranoïde',
    'settings.device.hidOnlyDesc':
      'Verbetert de compatibiliteit met de host als muis of toetsenbord niet meer reageren',
    'mouse.hidOnly.desc':
      'Als muis of toetsenbord niet meer reageren en het resetten van HID niet helpt, kan het gaan om een compatibiliteitsprobleem tussen de NanoKVM en de host.',
    'settings.device.hidOnlyTip':
      'De HID-Only-modus stopt met het emuleren van virtuele apparaten en behoudt alleen de basisbesturing van HID'
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
      'Zaktualizuj aplikację do wersji {{version}}, zanim zainstalujesz tę aktualizację systemu.',
    'settings.update.system.requiredAppVersion': 'Wymagana wersja aplikacji',
    'settings.device.diskDesc': 'Zamontuj kartę SD na zdalnym hoście',
    'settings.device.diskCancelMount':
      'Włączenie dysku wirtualnego anuluje zamontowany obraz. Kontynuować?',
    'image.diskOnWarn':
      'Zamontowanie obrazu wyłącza dysk wirtualny, więc komputer straci dostęp do /data. Kontynuować?',
    'image.diskOffWarn':
      'Dysk wirtualny jest wyłączony i musi zostać włączony, aby zamontować obraz. Urządzenia USB w komputerze zostaną wyliczone ponownie. Kontynuować?',
    'download.diskShared': 'Najpierw wyłącz dysk wirtualny, a następnie użyj pobierania obrazów.',
    'download.diskOff': 'Wyłącz dysk wirtualny',
    'settings.device.diskLocked':
      'Wyłączony, gdy obraz jest zamontowany (włączenie anuluje zamontowanie)',
    'settings.tailscale.memory.tip':
      'Gdy użycie pamięci przekracza limit, garbage collection działa bardziej agresywnie, aby zwolnić pamięć. Aby zmiana zaczęła obowiązywać, trzeba ponownie uruchomić Tailscale.',
    'settings.tailscale.restart': 'Uruchomić ponownie Tailscale?',
    'settings.tailscale.stop': 'Zatrzymać Tailscale?',
    'settings.tailscale.stopDesc':
      'Wylogowuje z Tailscale i wyłącza jego automatyczne uruchamianie przy starcie systemu.',
    'settings.tailscale.okBtn': 'Tak',
    'settings.tailscale.cancelBtn': 'Nie',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC jest wyłączony w trybach zapory Ograniczony i Paranoidalny',
    'settings.system.firewall.enableHttpsFirst':
      'Włącz HTTPS przed włączeniem trybu Ograniczony lub Paranoidalny',
    'settings.system.firewall.httpsRequired':
      'Tryby Ograniczony i Paranoidalny są niedostępne, dopóki HTTPS nie zostanie włączony w Ustawienia > System > Sieć.',
    'settings.system.firewall.mode.description':
      'Wybierz, jak udostępniony jest przychodzący dostęp administracyjny. Umiarkowany jest domyślnym profilem lokalnym; Ograniczony utrzymuje HTTPS/SSH tylko lokalnie i blokuje WebRTC; Podstawowy jest otwartym profilem zgodności.',
    'settings.system.firewall.mode.baseline': 'Podstawowy',
    'settings.system.firewall.mode.moderate': 'Umiarkowany',
    'settings.system.firewall.mode.moderateDesc':
      'Profil domyślny. Zachowuje usługi baseline, ale przyjmuje nowe połączenia przychodzące tylko z zakresów prywatnych, ULA, link-local lub loopback.',
    'settings.system.firewall.mode.restricted': 'Ograniczony',
    'settings.system.firewall.mode.paranoid': 'Paranoidalny',
    'settings.system.firewall.moderate.apply': 'Przełącz na Umiarkowany',
    'settings.system.firewall.moderate.active': 'Tryb zapory Umiarkowany jest aktywny',
    'settings.system.firewall.restricted.enable': 'Włącz Ograniczony',
    'settings.system.firewall.restricted.active': 'Tryb zapory Ograniczony jest aktywny',
    'settings.system.firewall.restricted.confirmTitle': 'Włączyć tryb zapory Ograniczony?',
    'settings.system.firewall.paranoid.enable': 'Włącz Paranoidalny',
    'settings.system.firewall.paranoid.active': 'Tryb zapory Paranoidalny jest aktywny',
    'settings.system.firewall.paranoid.confirmTitle': 'Włączyć tryb zapory Paranoidalny?',
    'settings.system.firewall.baseline.apply': 'Przełącz na Podstawowy',
    'settings.system.firewall.baseline.active': 'Tryb zapory Podstawowy jest aktywny',
    'settings.system.firewall.baseline.confirmTitle': 'Przełączyć na otwarty tryb Podstawowy?',
    'settings.update.paranoidBlocked':
      'Aktualizacje online są blokowane przez tryb zapory Paranoidalny',
    'settings.device.hidOnlyDesc':
      'Poprawia zgodność z hostem, gdy mysz lub klawiatura przestają reagować',
    'mouse.hidOnly.desc':
      'Jeśli mysz lub klawiatura przestaną reagować, a reset HID nie pomaga, może to być problem ze zgodnością między NanoKVM a hostem.',
    'settings.device.hidOnlyTip':
      'Tryb HID-Only przestaje emulować urządzenia wirtualne i zachowuje tylko podstawową kontrolę HID'
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
      'Atualize o aplicativo para {{version}} antes de instalar esta atualização do sistema.',
    'settings.update.system.requiredAppVersion': 'Versão do aplicativo necessária',
    'settings.system.firewall.enableHttpsFirst':
      'Ative o HTTPS antes de ativar o modo de firewall Restrito ou Paranoico',
    'settings.system.firewall.httpsRequired':
      'Os modos Restrito e Paranoico ficam desativados até que o HTTPS seja ativado em Configurações > Sistema > Rede.',
    'settings.system.firewall.mode.baselineDesc':
      'Perfil aberto e gerenciado. Mantém o acesso normal ao NanoKVM sem filtragem por faixas de origem.',
    'settings.system.firewall.mode.moderateDesc':
      'Perfil padrão. Mantém os serviços do Base, mas só aceita novas conexões de entrada de faixas privadas, ULA, link-local ou loopback.',
    'settings.system.firewall.mode.paranoidDesc':
      'Acesso HTTPS somente local. Bloqueia SSH, HTTP, atualizações online e outros recursos de rede de saída.',
    'settings.system.firewall.mode.current': 'Atual',
    'settings.system.firewall.mode.default': 'Padrão',
    'settings.system.firewall.mode.localOnly': 'Somente local',
    'settings.system.firewall.mode.openTag': 'Aberto',
    'settings.system.firewall.mode.httpsRequiredTag': 'Requer HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Saída aberta',
    'settings.system.firewall.mode.outboundLimited': 'Saída limitada',
    'settings.system.firewall.mode.httpsOnly': 'Somente HTTPS',
    'settings.system.firewall.moderate.apply': 'Mudar para Moderado',
    'settings.system.firewall.moderate.active': 'O modo de firewall Moderado está ativo',
    'settings.system.firewall.moderate.allows':
      'As conexões de entrada só são aceitas de faixas de origem IPv4 privadas, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local ou IPv6 loopback. O acesso de saída continua aberto.',
    'settings.system.firewall.baseline.apply': 'Mudar para Base',
    'settings.system.firewall.baseline.active': 'O modo de firewall Base está ativo',
    'settings.system.firewall.baseline.allows':
      'O serviço de firewall está ativo, mas as faixas de origem de entrada não são restritas. Use apenas em ambientes de laboratório confiáveis ou por compatibilidade.',
    'settings.system.firewall.baseline.confirmTitle': 'Mudar para o modo Base aberto?',
    'settings.system.firewall.baseline.confirmDesc':
      'O serviço de firewall continua ativo, mas a restrição a faixas de origem somente locais é removida. Faixas de origem públicas podem alcançar os serviços expostos do NanoKVM se a rede as rotear.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC está desativado nos modos de firewall Restrito e Paranoico',
    'settings.system.firewall.mode.description':
      'Escolha como o acesso administrativo de entrada é exposto. Moderado é o perfil local padrão; Restrito mantém HTTPS/SSH apenas local e bloqueia WebRTC; Base é um perfil aberto de compatibilidade.',
    'settings.system.firewall.mode.baseline': 'Base',
    'settings.system.firewall.mode.moderate': 'Moderado',
    'settings.system.firewall.mode.restricted': 'Restrito',
    'settings.system.firewall.mode.paranoid': 'Paranoico',
    'settings.system.firewall.restricted.enable': 'Ativar Restrito',
    'settings.system.firewall.restricted.active': 'O modo Firewall Restrito está ativo',
    'settings.system.firewall.restricted.confirmTitle': 'Ativar o modo Restrito?',
    'settings.system.firewall.paranoid.enable': 'Ativar Paranoico',
    'settings.system.firewall.paranoid.active': 'O modo Firewall Paranoico está ativo',
    'settings.system.firewall.paranoid.confirmTitle': 'Ativar o modo Paranoico?',
    'settings.update.paranoidBlocked':
      'Atualizações online são bloqueadas pelo modo de firewall Paranoico',
    'settings.device.hidOnlyDesc':
      'Melhora a compatibilidade com o host se o mouse ou o teclado pararem de responder',
    'mouse.hidOnly.desc':
      'Se o mouse ou o teclado pararem de responder e redefinir o HID não ajudar, pode haver um problema de compatibilidade entre o NanoKVM e o host.',
    'settings.device.hidOnlyTip':
      'O modo HID-Only deixa de emular dispositivos virtuais e mantém apenas o controle básico HID'
  },
  ru: {
    'download.disabled':
      'Сейчас нельзя скачивать или загружать образы, потому что хранилище недоступно для записи. Если образ смонтирован, размонтируйте его, а затем отключите виртуальный диск, чтобы хранилище снова стало доступным для записи.',
    'keyboard.submit': 'Отправить',
    'keyboard.shortcut.title': 'Сочетания клавиш',
    'settings.device.mouseJiggler.title': 'Имитация движения мыши',
    'settings.device.ssh.tip':
      'Задайте надёжный пароль перед включением (Аккаунт - Изменить пароль)',
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
      'Режимы «Ограниченный» и «Параноидальный» недоступны, пока HTTPS не включен в Настройки > Система > Сеть.',
    'settings.system.firewall.mode.description':
      'Выберите, как открыт входящий административный доступ. «Умеренный» — типовой локальный профиль; «Ограниченный» оставляет HTTPS/SSH только локальными и блокирует WebRTC; «Базовый» — открытый профиль совместимости.',
    'settings.system.firewall.mode.baseline': 'Базовый',
    'settings.system.firewall.mode.moderate': 'Умеренный',
    'settings.system.firewall.mode.moderateDesc':
      'Дефолтный профиль. Сохраняет сервисы baseline, но принимает новые входящие соединения только из private, ULA, link-local или loopback диапазонов.',
    'settings.system.firewall.mode.restricted': 'Ограниченный',
    'settings.system.firewall.mode.paranoid': 'Параноидальный',
    'settings.system.firewall.moderate.apply': 'Переключить на «Умеренный»',
    'settings.system.firewall.moderate.active': 'Режим брандмауэра «Умеренный» активен',
    'settings.system.firewall.restricted.enable': 'Включить «Ограниченный»',
    'settings.system.firewall.restricted.active': 'Режим брандмауэра «Ограниченный» активен',
    'settings.system.firewall.restricted.confirmTitle':
      'Включить режим брандмауэра «Ограниченный»?',
    'settings.system.firewall.paranoid.enable': 'Включить «Параноидальный»',
    'settings.system.firewall.paranoid.active': 'Режим брандмауэра «Параноидальный» активен',
    'settings.system.firewall.paranoid.confirmTitle':
      'Включить режим брандмауэра «Параноидальный»?',
    'settings.system.firewall.baseline.apply': 'Переключить на «Базовый»',
    'settings.system.firewall.baseline.active': 'Режим брандмауэра «Базовый» активен',
    'settings.system.firewall.baseline.confirmTitle': 'Переключить на открытый режим «Базовый»?',
    'settings.update.paranoidBlocked':
      'Онлайн-обновления заблокированы режимом брандмауэра «Параноидальный»',
    'settings.device.hidOnlyDesc':
      'Улучшает совместимость с хостом, если мышь или клавиатура перестали отвечать',
    'mouse.hidOnly.desc':
      'Если мышь или клавиатура перестали отвечать и сброс HID не помогает, возможно, это проблема совместимости между NanoKVM и хостом.',
    'settings.device.hidOnlyTip':
      'Режим HID-Only прекращает эмуляцию виртуальных устройств и сохраняет только базовое управление HID'
  },
  se: {
    'auth.illegalPassword':
      'Lösenordet måste vara minst 8 tecken och får inte innehålla citattecken eller snedstreck',
    'screen.videoDirectTips':
      'Aktivera HTTPS under "Inställningar > System > Nätverk" för att använda detta läge',
    'download.disabled':
      'Avbildningar kan inte laddas ned eller laddas upp just nu eftersom lagringen inte är skrivbar. Om en avbildning är monterad, avmontera den och stäng sedan av den virtuella disken så att lagringen blir skrivbar igen.',
    'download.sha256': 'SHA-256 (valfritt)',
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
      'Uppdatera programmet till {{version}} innan du installerar den här systemuppdateringen.',
    'settings.update.system.requiredAppVersion': 'Programversion som krävs',
    'settings.system.firewall.enableHttpsFirst':
      'Aktivera HTTPS innan du aktiverar brandväggsläget Begränsad eller Paranoid',
    'settings.system.firewall.httpsRequired':
      'Lägena Begränsad och Paranoid är inaktiverade tills HTTPS har aktiverats under Inställningar > System > Nätverk.',
    'settings.system.firewall.mode.baselineDesc':
      'Öppen hanterad profil. Behåller normal åtkomst till NanoKVM utan filtrering av källintervall.',
    'settings.system.firewall.mode.moderateDesc':
      'Standardprofil. Behåller Bas-tjänsterna men tar bara emot nya inkommande anslutningar från privata, ULA-, link-local- eller loopback-intervall.',
    'settings.system.firewall.mode.paranoidDesc':
      'Endast lokal HTTPS-åtkomst. Blockerar SSH, HTTP, onlineuppdateringar och andra utgående nätverksfunktioner.',
    'settings.system.firewall.mode.current': 'Aktuell',
    'settings.system.firewall.mode.default': 'Standard',
    'settings.system.firewall.mode.localOnly': 'Endast lokalt',
    'settings.system.firewall.mode.openTag': 'Öppen',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS krävs',
    'settings.system.firewall.mode.outboundOpen': 'Utgående öppen',
    'settings.system.firewall.mode.outboundLimited': 'Utgående begränsad',
    'settings.system.firewall.mode.httpsOnly': 'Endast HTTPS',
    'settings.system.firewall.moderate.apply': 'Byt till Måttlig',
    'settings.system.firewall.moderate.active': 'Brandväggsläget Måttlig är aktivt',
    'settings.system.firewall.moderate.allows':
      'Inkommande anslutningar accepteras endast från privata IPv4-, IPv4 link-local/loopback-, IPv6 ULA-, IPv6 link-local- eller IPv6 loopback-källintervall. Utgående åtkomst förblir öppen.',
    'settings.system.firewall.baseline.apply': 'Byt till Bas',
    'settings.system.firewall.baseline.active': 'Brandväggsläget Bas är aktivt',
    'settings.system.firewall.baseline.allows':
      'Brandväggstjänsten är aktiv, men inkommande källintervall är inte begränsade. Använd endast i betrodda labb- eller kompatibilitetsscenarier.',
    'settings.system.firewall.baseline.confirmTitle': 'Byta till öppet läge Bas?',
    'settings.system.firewall.baseline.confirmDesc':
      'Brandväggstjänsten förblir aktiv, men begränsningen till lokala källintervall tas bort. Offentliga källintervall kan nå exponerade NanoKVM-tjänster om nätverket routar dem.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC är inaktiverat i brandväggslägena Begränsad och Paranoid',
    'settings.system.firewall.mode.description':
      'Välj hur inkommande administratörsåtkomst exponeras. Måttlig är standardprofilen endast för lokala nät; Begränsad håller HTTPS/SSH lokalt och blockerar WebRTC; Bas är en öppen kompatibilitetsprofil.',
    'settings.system.firewall.mode.baseline': 'Bas',
    'settings.system.firewall.mode.moderate': 'Måttlig',
    'settings.system.firewall.mode.restricted': 'Begränsad',
    'settings.system.firewall.mode.paranoid': 'Paranoid',
    'settings.system.firewall.restricted.enable': 'Aktivera Begränsad',
    'settings.system.firewall.restricted.active': 'Brandväggsläget Begränsad är aktivt',
    'settings.system.firewall.restricted.confirmTitle': 'Aktivera brandväggsläget Begränsad?',
    'settings.system.firewall.paranoid.enable': 'Aktivera Paranoid',
    'settings.system.firewall.paranoid.active': 'Brandväggsläget Paranoid är aktivt',
    'settings.system.firewall.paranoid.confirmTitle': 'Aktivera brandväggsläget Paranoid?',
    'settings.update.paranoidBlocked': 'Onlineuppdateringar blockeras av brandväggsläget Paranoid',
    'settings.device.hidOnlyDesc':
      'Förbättrar kompatibiliteten med värden om musen eller tangentbordet slutar svara',
    'mouse.hidOnly.desc':
      'Om musen eller tangentbordet slutar svara och det inte hjälper att återställa HID kan det vara ett kompatibilitetsproblem mellan NanoKVM och värden.',
    'settings.device.hidOnlyTip':
      'HID-Only-läge slutar emulera virtuella enheter och behåller bara grundläggande HID-kontroll'
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
    'settings.device.oled.180': '3 นาที',
    'settings.device.ssh.tip': 'ตั้งรหัสผ่านที่ปลอดภัยก่อนเปิดใช้งาน (บัญชี - เปลี่ยนรหัสผ่าน)',
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
      'โปรไฟล์แบบเปิดที่จัดการโดยระบบ คงการเข้าถึง NanoKVM ตามปกติโดยไม่กรองตามช่วงต้นทาง',
    'settings.system.firewall.mode.moderateDesc':
      'โปรไฟล์เริ่มต้น คงบริการของ พื้นฐาน ไว้ แต่รับการเชื่อมต่อขาเข้าใหม่จากช่วงส่วนตัว, ULA, link-local หรือ loopback เท่านั้น',
    'settings.system.firewall.mode.paranoidDesc':
      'เข้าถึง HTTPS ได้เฉพาะภายในเครื่อง บล็อก SSH, HTTP, การอัปเดตออนไลน์ และฟีเจอร์เครือข่ายขาออกอื่น ๆ',
    'settings.system.firewall.mode.current': 'ปัจจุบัน',
    'settings.system.firewall.mode.default': 'ค่าเริ่มต้น',
    'settings.system.firewall.mode.localOnly': 'เฉพาะภายในเครื่อง',
    'settings.system.firewall.mode.openTag': 'เปิด',
    'settings.system.firewall.mode.httpsRequiredTag': 'ต้องใช้ HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'ขาออกเปิด',
    'settings.system.firewall.mode.outboundLimited': 'ขาออกจำกัด',
    'settings.system.firewall.mode.httpsOnly': 'เฉพาะ HTTPS',
    'settings.system.firewall.moderate.apply': 'สลับไปใช้ ปานกลาง',
    'settings.system.firewall.moderate.active': 'โหมดไฟร์วอลล์ ปานกลาง กำลังทำงาน',
    'settings.system.firewall.moderate.allows':
      'รับการเชื่อมต่อขาเข้าเฉพาะจากช่วงต้นทาง IPv4 ส่วนตัว, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local หรือ IPv6 loopback เท่านั้น การเข้าถึงขาออกยังคงเปิดอยู่',
    'settings.system.firewall.baseline.apply': 'สลับไปใช้ พื้นฐาน',
    'settings.system.firewall.baseline.active': 'โหมดไฟร์วอลล์ พื้นฐาน กำลังทำงาน',
    'settings.system.firewall.baseline.allows':
      'บริการไฟร์วอลล์ทำงานอยู่ แต่ช่วงต้นทางขาเข้าไม่ถูกจำกัด ใช้เฉพาะในสภาพแวดล้อมห้องทดลองที่เชื่อถือได้หรือกรณีที่ต้องการความเข้ากันได้',
    'settings.system.firewall.baseline.confirmTitle': 'สลับไปใช้โหมด พื้นฐาน แบบเปิดหรือไม่?',
    'settings.system.firewall.baseline.confirmDesc':
      'บริการไฟร์วอลล์ยังคงทำงานอยู่ แต่จะยกเลิกข้อจำกัดเฉพาะช่วงต้นทางภายในเครื่อง ช่วงต้นทางสาธารณะอาจเข้าถึงบริการ NanoKVM ที่เปิดอยู่ได้หากเครือข่ายส่งต่อให้',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC ถูกปิดใช้งานในโหมดไฟร์วอลล์ จำกัด และ หวาดระแวง',
    'settings.system.firewall.mode.description':
      'เลือกวิธีเปิดเผยการเข้าถึงผู้ดูแลขาเข้า ปานกลาง เป็นโปรไฟล์ภายในเริ่มต้น; จำกัด ให้ HTTPS/SSH ใช้ได้เฉพาะภายในและบล็อก WebRTC; พื้นฐาน เป็นโปรไฟล์เปิดเพื่อความเข้ากันได้',
    'settings.system.firewall.mode.baseline': 'พื้นฐาน',
    'settings.system.firewall.mode.moderate': 'ปานกลาง',
    'settings.system.firewall.mode.restricted': 'จำกัด',
    'settings.system.firewall.mode.paranoid': 'หวาดระแวง',
    'settings.system.firewall.restricted.enable': 'เปิด จำกัด',
    'settings.system.firewall.restricted.active': 'โหมดไฟร์วอลล์ จำกัด เปิดใช้งานอยู่',
    'settings.system.firewall.restricted.confirmTitle': 'เปิดโหมด จำกัด หรือไม่?',
    'settings.system.firewall.paranoid.enable': 'เปิด หวาดระแวง',
    'settings.system.firewall.paranoid.active': 'โหมดไฟร์วอลล์ หวาดระแวง เปิดใช้งานอยู่',
    'settings.system.firewall.paranoid.confirmTitle': 'เปิดโหมด หวาดระแวง หรือไม่?',
    'settings.update.paranoidBlocked': 'การอัปเดตออนไลน์ถูกบล็อกโดยโหมดไฟร์วอลล์ หวาดระแวง',
    'settings.device.hidOnlyDesc':
      'ช่วยให้ทำงานร่วมกับโฮสต์ได้ดีขึ้น หากเมาส์หรือคีย์บอร์ดไม่ตอบสนอง',
    'mouse.hidOnly.desc':
      'หากเมาส์หรือคีย์บอร์ดไม่ตอบสนองและการรีเซ็ต HID ไม่ช่วย อาจเป็นปัญหาความเข้ากันได้ระหว่าง NanoKVM กับโฮสต์',
    'settings.device.hidOnlyTip':
      'โหมด HID-Only จะหยุดจำลองอุปกรณ์เสมือนและคงไว้เพียงการควบคุม HID พื้นฐาน'
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
    'settings.tailscale.notInstall': 'Tailscale bulunamadı! Lütfen yükleyin.',
    'settings.tailscale.retry': 'Lütfen sayfayı yenileyin ve tekrar deneyin, ya da manuel yükleyin',
    'settings.tailscale.urlPeriod': 'Adres sadece 10 dakika boyunca geçerlidir',
    'settings.device.hdmi.description': 'HDMI/Monitör çıktısını aktifleştir',
    'settings.account.logoutBtn': 'Çıkış yap',
    'settings.device.swap.disable': 'Devre dışı bırak',
    'settings.device.diskDesc': 'SD kartı uzak ana bilgisayara bağla',
    'settings.device.diskCancelMount':
      'Sanal diski etkinleştirmek bağlı imajı iptal eder. Devam edilsin mi?',
    'wifi.success': "NanoKVM'in ağ durumunu kontrol etmek için cihazın başına gidin.",
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
      'Bu sistem güncellemesini yüklemeden önce uygulamayı {{version}} sürümüne güncelleyin.',
    'settings.update.system.requiredAppVersion': 'Gerekli uygulama sürümü',
    'settings.system.firewall.enableHttpsFirst':
      "Kısıtlı veya Paranoyak güvenlik duvarı modunu etkinleştirmeden önce HTTPS'i etkinleştirin",
    'settings.system.firewall.httpsRequired':
      'Kısıtlı ve Paranoyak modları, HTTPS Ayarlar > Sistem > Ağ bölümünde etkinleştirilene kadar devre dışıdır.',
    'settings.system.firewall.mode.baselineDesc':
      'Açık, yönetilen profil. Kaynak aralığı filtrelemesi olmadan normal NanoKVM erişimini korur.',
    'settings.system.firewall.mode.moderateDesc':
      'Varsayılan profil. Temel mod hizmetlerini korur, ancak yeni gelen bağlantıları yalnızca özel, ULA, link-local veya loopback aralıklarından kabul eder.',
    'settings.system.firewall.mode.paranoidDesc':
      'Yalnızca yerel HTTPS erişimi. SSH, HTTP, çevrimiçi güncellemeleri ve diğer giden ağ özelliklerini engeller.',
    'settings.system.firewall.mode.current': 'Geçerli',
    'settings.system.firewall.mode.default': 'Varsayılan',
    'settings.system.firewall.mode.localOnly': 'Yalnızca yerel',
    'settings.system.firewall.mode.openTag': 'Açık',
    'settings.system.firewall.mode.httpsRequiredTag': 'HTTPS gerekli',
    'settings.system.firewall.mode.outboundOpen': 'Giden açık',
    'settings.system.firewall.mode.outboundLimited': 'Giden sınırlı',
    'settings.system.firewall.mode.httpsOnly': 'Yalnızca HTTPS',
    'settings.system.firewall.moderate.apply': 'Orta moda geç',
    'settings.system.firewall.moderate.active': 'Orta güvenlik duvarı modu etkin',
    'settings.system.firewall.moderate.allows':
      'Gelen bağlantılar yalnızca özel IPv4, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local veya IPv6 loopback kaynak aralıklarından kabul edilir. Giden erişim açık kalır.',
    'settings.system.firewall.baseline.apply': 'Temel moda geç',
    'settings.system.firewall.baseline.active': 'Temel güvenlik duvarı modu etkin',
    'settings.system.firewall.baseline.allows':
      'Güvenlik duvarı hizmeti etkin, ancak gelen kaynak aralıkları kısıtlanmaz. Bunu yalnızca güvenilir laboratuvar veya uyumluluk senaryolarında kullanın.',
    'settings.system.firewall.baseline.confirmTitle': 'Açık Temel moduna geçilsin mi?',
    'settings.system.firewall.baseline.confirmDesc':
      "Güvenlik duvarı hizmeti etkin kalır, ancak yalnızca yerel kaynak aralığı kısıtlaması kaldırılır. Ağ yönlendiriyorsa genel kaynak aralıkları NanoKVM'in açıkta kalan hizmetlerine ulaşabilir.",
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC, Kısıtlı ve Paranoyak güvenlik duvarı modlarında devre dışıdır',
    'settings.system.firewall.mode.description':
      'Gelen yönetim erişiminin nasıl açılacağını seçin. Orta varsayılan yerel profildir; Kısıtlı HTTPS/SSH’yi yerel tutar ve WebRTC’yi engeller; Temel açık uyumluluk profilidir.',
    'settings.system.firewall.mode.baseline': 'Temel',
    'settings.system.firewall.mode.moderate': 'Orta',
    'settings.system.firewall.mode.restricted': 'Kısıtlı',
    'settings.system.firewall.mode.paranoid': 'Paranoyak',
    'settings.system.firewall.restricted.enable': 'Kısıtlı modu etkinleştir',
    'settings.system.firewall.restricted.active': 'Kısıtlı güvenlik duvarı modu etkin',
    'settings.system.firewall.restricted.confirmTitle': 'Kısıtlı modu etkinleştirilsin mi?',
    'settings.system.firewall.paranoid.enable': 'Paranoyak modu etkinleştir',
    'settings.system.firewall.paranoid.active': 'Paranoyak güvenlik duvarı modu etkin',
    'settings.system.firewall.paranoid.confirmTitle': 'Paranoyak modu etkinleştirilsin mi?',
    'settings.update.paranoidBlocked':
      'Çevrimiçi güncellemeler Paranoyak güvenlik duvarı modu tarafından engellenir',
    'settings.device.hidOnlyDesc':
      'Fare veya klavye yanıt vermeyi bırakırsa ana bilgisayarla uyumluluğu artırır',
    'mouse.hidOnly.desc':
      "Fare veya klavye yanıt vermeyi bırakır ve HID'i sıfırlamak yardımcı olmazsa, NanoKVM ile ana bilgisayar arasında bir uyumluluk sorunu olabilir.",
    'settings.device.hidOnlyTip':
      'HID-Only modu sanal aygıtları taklit etmeyi durdurur ve yalnızca temel HID kontrolünü korur'
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
    'settings.device.swap.disable': 'Вимкнути',
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
      'Оновіть застосунок до {{version}}, перш ніж встановлювати це оновлення системи.',
    'settings.update.system.requiredAppVersion': 'Потрібна версія застосунку',
    'settings.system.firewall.enableHttpsFirst':
      'Увімкніть HTTPS, перш ніж вмикати режим брандмауера Обмежений або Параноїдальний',
    'settings.system.firewall.httpsRequired':
      'Режими Обмежений і Параноїдальний вимкнено, доки HTTPS не буде увімкнено в Налаштування > Система > Мережа.',
    'settings.system.firewall.mode.baselineDesc':
      'Відкритий керований профіль. Зберігає звичайний доступ до NanoKVM без фільтрації за діапазонами джерел.',
    'settings.system.firewall.mode.moderateDesc':
      'Типовий профіль. Зберігає служби базового режиму, але приймає нові вхідні підключення лише з приватних діапазонів, ULA, link-local або loopback.',
    'settings.system.firewall.mode.paranoidDesc':
      'Лише локальний доступ HTTPS. Блокує SSH, HTTP, онлайн-оновлення та інші функції вихідної мережі.',
    'settings.system.firewall.mode.current': 'Поточний',
    'settings.system.firewall.mode.default': 'Типовий',
    'settings.system.firewall.mode.localOnly': 'Лише локально',
    'settings.system.firewall.mode.openTag': 'Відкритий',
    'settings.system.firewall.mode.httpsRequiredTag': 'Потрібен HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Вихідні відкриті',
    'settings.system.firewall.mode.outboundLimited': 'Вихідні обмежені',
    'settings.system.firewall.mode.httpsOnly': 'Лише HTTPS',
    'settings.system.firewall.moderate.apply': 'Перейти на Помірний',
    'settings.system.firewall.moderate.active': 'Режим брандмауера Помірний активний',
    'settings.system.firewall.moderate.allows':
      'Вхідні підключення приймаються лише з діапазонів джерел приватних IPv4, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local або IPv6 loopback. Вихідний доступ залишається відкритим.',
    'settings.system.firewall.baseline.apply': 'Перейти на Базовий',
    'settings.system.firewall.baseline.active': 'Режим брандмауера Базовий активний',
    'settings.system.firewall.baseline.allows':
      'Служба брандмауера активна, але вхідні діапазони джерел не обмежені. Використовуйте лише в довірених лабораторних умовах або для сумісності.',
    'settings.system.firewall.baseline.confirmTitle': 'Перейти на відкритий режим Базовий?',
    'settings.system.firewall.baseline.confirmDesc':
      'Служба брандмауера залишається активною, але обмеження лише локальними діапазонами джерел знімається. Публічні діапазони джерел можуть досягти відкритих служб NanoKVM, якщо мережа їх маршрутизує.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC вимкнено в режимах firewall Обмежений і Параноїдальний',
    'settings.system.firewall.mode.description':
      'Виберіть, як відкрито вхідний адміністративний доступ. Помірний — типовий локальний профіль; Обмежений залишає HTTPS/SSH лише локальними та блокує WebRTC; Базовий — відкритий профіль сумісності.',
    'settings.system.firewall.mode.baseline': 'Базовий',
    'settings.system.firewall.mode.moderate': 'Помірний',
    'settings.system.firewall.mode.restricted': 'Обмежений',
    'settings.system.firewall.mode.paranoid': 'Параноїдальний',
    'settings.system.firewall.restricted.enable': 'Увімкнути Обмежений',
    'settings.system.firewall.restricted.active': 'Режим брандмауера Обмежений активний',
    'settings.system.firewall.restricted.confirmTitle': 'Увімкнути режим Обмежений?',
    'settings.system.firewall.paranoid.enable': 'Увімкнути Параноїдальний',
    'settings.system.firewall.paranoid.active': 'Режим брандмауера Параноїдальний активний',
    'settings.system.firewall.paranoid.confirmTitle': 'Увімкнути режим Параноїдальний?',
    'settings.update.paranoidBlocked':
      'Онлайн-оновлення заблоковані режимом брандмауера Параноїдальний',
    'settings.device.hidOnlyDesc':
      'Покращує сумісність із хостом, якщо миша або клавіатура перестали відповідати',
    'mouse.hidOnly.desc':
      'Якщо миша або клавіатура перестали відповідати, а скидання HID не допомагає, це може бути проблема сумісності між NanoKVM і хостом.',
    'settings.device.hidOnlyTip':
      'Режим HID-Only припиняє емуляцію віртуальних пристроїв і зберігає лише базове керування HID'
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
      'Hãy cập nhật ứng dụng lên {{version}} trước khi cài đặt bản cập nhật hệ thống này.',
    'settings.update.system.requiredAppVersion': 'Phiên bản ứng dụng bắt buộc',
    'settings.device.diskDesc': 'Gắn thẻ SD vào máy chủ từ xa',
    'settings.device.diskCancelMount': 'Bật đĩa ảo sẽ hủy image đang gắn. Tiếp tục?',
    'image.diskOnWarn':
      'Gắn image sẽ tắt đĩa ảo, nên máy tính không còn truy cập được /data. Tiếp tục?',
    'image.diskOffWarn':
      'Đĩa ảo đang tắt và cần được bật để gắn image. Các thiết bị USB trên máy tính sẽ được nhận diện lại. Tiếp tục?',
    'download.diskShared': 'Hãy tắt đĩa ảo trước, rồi dùng tính năng tải image.',
    'download.diskOff': 'Tắt đĩa ảo',
    'settings.device.diskLocked': 'Tắt khi đang gắn image (bật sẽ hủy việc gắn)',
    'settings.tailscale.memory.tip':
      'Khi mức dùng bộ nhớ vượt giới hạn, garbage collection sẽ chạy quyết liệt hơn để giải phóng bộ nhớ. Cần khởi động lại Tailscale để thay đổi có hiệu lực.',
    'settings.tailscale.restart': 'Khởi động lại Tailscale?',
    'settings.tailscale.stop': 'Dừng Tailscale?',
    'settings.tailscale.stopDesc': 'Đăng xuất Tailscale và tắt tự khởi động khi khởi động máy.',
    'settings.tailscale.okBtn': 'Có',
    'settings.tailscale.cancelBtn': 'Không',
    'wifi.success': 'Hãy đến thiết bị để kiểm tra trạng thái mạng của NanoKVM.',
    'settings.system.firewall.enableHttpsFirst':
      'Hãy bật HTTPS trước khi bật chế độ tường lửa Hạn chế hoặc Hoang tưởng',
    'settings.system.firewall.httpsRequired':
      'Các chế độ Hạn chế và Hoang tưởng bị tắt cho đến khi HTTPS được bật trong Cài đặt > Hệ thống > Mạng.',
    'settings.system.firewall.mode.baselineDesc':
      'Hồ sơ mở, được quản lý. Giữ quyền truy cập NanoKVM bình thường mà không lọc theo dải nguồn.',
    'settings.system.firewall.mode.moderateDesc':
      'Hồ sơ mặc định. Giữ các dịch vụ của Cơ bản, nhưng chỉ chấp nhận kết nối đến mới từ các dải riêng tư, ULA, link-local hoặc loopback.',
    'settings.system.firewall.mode.paranoidDesc':
      'Chỉ truy cập HTTPS cục bộ. Chặn SSH, HTTP, cập nhật trực tuyến và các tính năng mạng đi ra khác.',
    'settings.system.firewall.mode.current': 'Hiện tại',
    'settings.system.firewall.mode.default': 'Mặc định',
    'settings.system.firewall.mode.localOnly': 'Chỉ cục bộ',
    'settings.system.firewall.mode.openTag': 'Mở',
    'settings.system.firewall.mode.httpsRequiredTag': 'Cần HTTPS',
    'settings.system.firewall.mode.outboundOpen': 'Đi ra: mở',
    'settings.system.firewall.mode.outboundLimited': 'Đi ra: hạn chế',
    'settings.system.firewall.mode.httpsOnly': 'Chỉ HTTPS',
    'settings.system.firewall.moderate.apply': 'Chuyển sang Vừa phải',
    'settings.system.firewall.moderate.active': 'Chế độ tường lửa Vừa phải đang hoạt động',
    'settings.system.firewall.moderate.allows':
      'Chỉ chấp nhận kết nối đến từ các dải nguồn IPv4 riêng tư, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local hoặc IPv6 loopback. Truy cập đi ra vẫn mở.',
    'settings.system.firewall.baseline.apply': 'Chuyển sang Cơ bản',
    'settings.system.firewall.baseline.active': 'Chế độ tường lửa Cơ bản đang hoạt động',
    'settings.system.firewall.baseline.allows':
      'Dịch vụ tường lửa đang hoạt động nhưng các dải nguồn đến không bị hạn chế. Chỉ dùng trong môi trường phòng thí nghiệm tin cậy hoặc khi cần tương thích.',
    'settings.system.firewall.baseline.confirmTitle': 'Chuyển sang chế độ Cơ bản mở?',
    'settings.system.firewall.baseline.confirmDesc':
      'Dịch vụ tường lửa vẫn hoạt động nhưng bỏ hạn chế chỉ cho dải nguồn cục bộ. Các dải nguồn công khai có thể truy cập các dịch vụ NanoKVM đang mở nếu mạng định tuyến cho chúng.',
    'screen.videoWebrtcBlockedByFirewall':
      'H.264 WebRTC bị tắt trong các chế độ tường lửa Hạn chế và Hoang tưởng',
    'settings.system.firewall.mode.description':
      'Chọn cách mở truy cập quản trị đi vào. Vừa phải là hồ sơ cục bộ mặc định; Hạn chế giữ HTTPS/SSH chỉ cục bộ và chặn WebRTC; Cơ bản là hồ sơ tương thích mở.',
    'settings.system.firewall.mode.baseline': 'Cơ bản',
    'settings.system.firewall.mode.moderate': 'Vừa phải',
    'settings.system.firewall.mode.restricted': 'Hạn chế',
    'settings.system.firewall.mode.paranoid': 'Hoang tưởng',
    'settings.system.firewall.restricted.enable': 'Bật Hạn chế',
    'settings.system.firewall.restricted.active': 'Chế độ tường lửa Hạn chế đang hoạt động',
    'settings.system.firewall.restricted.confirmTitle': 'Bật chế độ Hạn chế?',
    'settings.system.firewall.paranoid.enable': 'Bật Hoang tưởng',
    'settings.system.firewall.paranoid.active': 'Chế độ tường lửa Hoang tưởng đang hoạt động',
    'settings.system.firewall.paranoid.confirmTitle': 'Bật chế độ Hoang tưởng?',
    'settings.update.paranoidBlocked': 'Cập nhật online bị chặn bởi chế độ tường lửa Hoang tưởng',
    'settings.device.hidOnlyDesc':
      'Cải thiện khả năng tương thích với máy chủ nếu chuột hoặc bàn phím ngừng phản hồi',
    'mouse.hidOnly.desc':
      'Nếu chuột hoặc bàn phím ngừng phản hồi và việc đặt lại HID không có tác dụng, có thể là sự cố tương thích giữa NanoKVM và máy chủ.',
    'settings.device.hidOnlyTip':
      'Chế độ HID-Only ngừng mô phỏng các thiết bị ảo và chỉ giữ lại điều khiển HID cơ bản'
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
    'settings.update.system.appUpdateRequired': '请先将应用更新到 {{version}}，再安装此系统更新。',
    'settings.update.system.requiredAppVersion': '所需应用版本',
    'settings.system.firewall.enableHttpsFirst': '请先启用 HTTPS，再启用受限或偏执防火墙模式',
    'settings.system.firewall.httpsRequired':
      '在“设置 > 系统 > 网络”中启用 HTTPS 之前，受限和偏执模式不可用。',
    'settings.system.firewall.mode.baselineDesc':
      '开放的受管配置。保持正常的 NanoKVM 访问，不按来源范围过滤。',
    'settings.system.firewall.mode.moderateDesc':
      '默认配置。保留基线的服务，但仅接受来自私有、ULA、链路本地或环回范围的新入站连接。',
    'settings.system.firewall.mode.paranoidDesc':
      '仅限本地的 HTTPS 访问。阻止 SSH、HTTP、在线更新和其他出站网络功能。',
    'settings.system.firewall.mode.current': '当前',
    'settings.system.firewall.mode.default': '默认',
    'settings.system.firewall.mode.localOnly': '仅限本地',
    'settings.system.firewall.mode.openTag': '开放',
    'settings.system.firewall.mode.httpsRequiredTag': '需要 HTTPS',
    'settings.system.firewall.mode.outboundOpen': '出站开放',
    'settings.system.firewall.mode.outboundLimited': '出站受限',
    'settings.system.firewall.mode.httpsOnly': '仅 HTTPS',
    'settings.system.firewall.moderate.apply': '切换到适中',
    'settings.system.firewall.moderate.active': '适中防火墙模式已启用',
    'settings.system.firewall.moderate.allows':
      '仅接受来自私有 IPv4、IPv4 链路本地/环回、IPv6 ULA、IPv6 链路本地或 IPv6 环回来源范围的入站连接。出站访问保持开放。',
    'settings.system.firewall.baseline.apply': '切换到基线',
    'settings.system.firewall.baseline.active': '基线防火墙模式已启用',
    'settings.system.firewall.baseline.allows':
      '防火墙服务已启用，但不限制入站来源范围。仅在可信的实验或兼容性场景中使用。',
    'settings.system.firewall.baseline.confirmTitle': '切换到开放的基线模式？',
    'settings.system.firewall.baseline.confirmDesc':
      '防火墙服务保持启用，但会取消仅限本地来源范围的限制。如果网络会路由，公共来源范围可能访问暴露的 NanoKVM 服务。',
    'screen.videoWebrtcBlockedByFirewall': 'H.264 WebRTC 在受限和偏执防火墙模式下已禁用',
    'settings.system.firewall.mode.description':
      '选择入站管理访问的暴露方式。适中是默认的仅本地配置；受限将 HTTPS/SSH 保持为仅本地并阻止 WebRTC；基线是开放的兼容配置。',
    'settings.system.firewall.mode.baseline': '基线',
    'settings.system.firewall.mode.moderate': '适中',
    'settings.system.firewall.mode.restricted': '受限',
    'settings.system.firewall.mode.paranoid': '偏执',
    'settings.system.firewall.restricted.enable': '启用受限',
    'settings.system.firewall.restricted.active': '受限防火墙模式已启用',
    'settings.system.firewall.restricted.confirmTitle': '启用受限防火墙模式？',
    'settings.system.firewall.paranoid.enable': '启用偏执',
    'settings.system.firewall.paranoid.active': '偏执防火墙模式已启用',
    'settings.system.firewall.paranoid.confirmTitle': '启用偏执防火墙模式？',
    'settings.update.paranoidBlocked': '在线更新被偏执防火墙模式阻止',
    'settings.device.hidOnlyDesc': '当鼠标或键盘停止响应时，改善与主机的兼容性',
    'mouse.hidOnly.desc':
      '如果鼠标或键盘停止响应，且重置 HID 无效，可能是 NanoKVM 与主机之间存在兼容性问题。',
    'settings.device.hidOnlyTip': 'HID-Only 模式会停止模拟虚拟设备，仅保留基础的 HID 控制'
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
      '請先將應用程式更新到 {{version}}，再安裝此系統更新。',
    'settings.update.system.requiredAppVersion': '所需應用程式版本',
    'settings.system.firewall.enableHttpsFirst': '請先啟用 HTTPS，再啟用受限或偏執防火牆模式',
    'settings.system.firewall.httpsRequired':
      '在「設定 > 系統 > 網路」中啟用 HTTPS 之前，受限和偏執模式無法使用。',
    'settings.system.firewall.mode.baselineDesc':
      '開放的受管設定檔。維持正常的 NanoKVM 存取，不依來源範圍過濾。',
    'settings.system.firewall.mode.moderateDesc':
      '預設設定檔。保留基準的服務，但僅接受來自私有、ULA、連結本機或迴路範圍的新傳入連線。',
    'settings.system.firewall.mode.paranoidDesc':
      '僅限本機的 HTTPS 存取。封鎖 SSH、HTTP、線上更新和其他傳出網路功能。',
    'settings.system.firewall.mode.current': '目前',
    'settings.system.firewall.mode.default': '預設',
    'settings.system.firewall.mode.localOnly': '僅限本機',
    'settings.system.firewall.mode.openTag': '開放',
    'settings.system.firewall.mode.httpsRequiredTag': '需要 HTTPS',
    'settings.system.firewall.mode.outboundOpen': '傳出開放',
    'settings.system.firewall.mode.outboundLimited': '傳出受限',
    'settings.system.firewall.mode.httpsOnly': '僅 HTTPS',
    'settings.system.firewall.moderate.apply': '切換到適中',
    'settings.system.firewall.moderate.active': '適中防火牆模式已啟用',
    'settings.system.firewall.moderate.allows':
      '僅接受來自私有 IPv4、IPv4 連結本機/迴路、IPv6 ULA、IPv6 連結本機或 IPv6 迴路來源範圍的傳入連線。傳出存取維持開放。',
    'settings.system.firewall.baseline.apply': '切換到基準',
    'settings.system.firewall.baseline.active': '基準防火牆模式已啟用',
    'settings.system.firewall.baseline.allows':
      '防火牆服務已啟用，但不限制傳入來源範圍。僅在可信任的實驗或相容性情境中使用。',
    'settings.system.firewall.baseline.confirmTitle': '切換到開放的基準模式？',
    'settings.system.firewall.baseline.confirmDesc':
      '防火牆服務維持啟用，但會取消僅限本機來源範圍的限制。若網路會路由，公開來源範圍可能存取暴露的 NanoKVM 服務。',
    'screen.videoWebrtcBlockedByFirewall': 'H.264 WebRTC 在受限和偏執防火牆模式下已停用',
    'settings.system.firewall.mode.description':
      '選擇輸入管理存取的開放方式。適中是預設的僅本機設定；受限讓 HTTPS/SSH 維持僅本機並阻擋 WebRTC；基準是開放相容性設定。',
    'settings.system.firewall.mode.baseline': '基準',
    'settings.system.firewall.mode.moderate': '適中',
    'settings.system.firewall.mode.restricted': '受限',
    'settings.system.firewall.mode.paranoid': '偏執',
    'settings.system.firewall.restricted.enable': '啟用受限',
    'settings.system.firewall.restricted.active': '受限防火牆模式已啟用',
    'settings.system.firewall.restricted.confirmTitle': '啟用受限防火牆模式？',
    'settings.system.firewall.paranoid.enable': '啟用偏執',
    'settings.system.firewall.paranoid.active': '偏執防火牆模式已啟用',
    'settings.system.firewall.paranoid.confirmTitle': '啟用偏執防火牆模式？',
    'settings.update.paranoidBlocked': '線上更新被偏執防火牆模式阻擋',
    'settings.device.hidOnlyDesc': '當滑鼠或鍵盤停止回應時，改善與主機的相容性',
    'mouse.hidOnly.desc':
      '如果滑鼠或鍵盤停止回應，且重設 HID 無效，可能是 NanoKVM 與主機之間存在相容性問題。',
    'settings.device.hidOnlyTip': 'HID-Only 模式會停止模擬虛擬設備，僅保留基礎 HID 控制'
  }
};
