type TranslationMap = Record<string, string>;

// Terminology by language: "HID-Only" stays English but "Mode" is translated, the PicoClaw assistant name,
// the Account "Change" button, the "Phone" layout option, word order of compound labels, and menu labels worded as actions.
export const termLocalizedExtras: Record<string, TranslationMap> = {
  ca: {
    'settings.device.hidOnly': 'Mode HID-Only',
    'settings.device.hidOnlyTip':
      'Activa el mode HID-Only per a una millor compatibilitat si el ratolí i el teclat deixen de respondre',
    'mouse.hidOnly.title': 'Mode HID-Only',
    'mouse.hidOnly.desc':
      "Si el ratolí i el teclat deixen de respondre i restablir el HID no ajuda, pot ser un problema de compatibilitat entre el NanoKVM i el dispositiu. Proveu d'activar el mode HID-Only per a una millor compatibilitat.",
    'mouse.hidOnly.tip1':
      'En activar el mode HID-Only es desmuntaran el disc virtual i la xarxa virtual',
    'mouse.hidOnly.tip2': "En el mode HID-Only, el muntatge d'imatges està desactivat",
    'mouse.hidOnly.enable': 'Activa el mode HID-Only',
    'mouse.hidOnly.disable': 'Desactiva el mode HID-Only',
    'settings.tailscale.swap.title': 'Memòria swap',
    'download.title': 'Descarrega imatges',
    'settings.appearance.menuBar.remoteDownload': 'Descarrega ISO remota',
    'picoclaw.title': 'Assistent PicoClaw',
    'wifi.ap.passPlaceholder': 'Contrasenya AP',
    'settings.appearance.layoutMobile': 'Mòbil',
    'settings.appearance.layoutModeDesc': 'Utilitza el disseny de mòbil/tàctil en aquest navegador'
  },
  cz: {
    'settings.device.hidOnly': 'Režim HID-Only',
    'settings.device.hidOnlyTip':
      'Pokud myš a klávesnice přestanou reagovat, zapněte pro lepší kompatibilitu režim HID-Only',
    'mouse.hidOnly.title': 'Režim HID-Only',
    'mouse.hidOnly.desc':
      'Pokud myš a klávesnice přestanou reagovat a reset HID nepomůže, může jít o problém s kompatibilitou mezi NanoKVM a zařízením. Zkuste pro lepší kompatibilitu zapnout režim HID-Only.',
    'mouse.hidOnly.tip1': 'Zapnutím režimu HID-Only se odpojí virtuální disk a virtuální síť',
    'mouse.hidOnly.tip2': 'V režimu HID-Only je připojování obrazů zakázáno',
    'mouse.hidOnly.enable': 'Zapnout režim HID-Only',
    'mouse.hidOnly.disable': 'Vypnout režim HID-Only',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Paměť swap',
    'download.title': 'Stáhnout obrazy',
    'settings.appearance.menuBar.remoteDownload': 'Stáhnout vzdálené ISO',
    'settings.account.updateBtn': 'Změnit',
    'picoclaw.title': 'Asistent PicoClaw',
    'wifi.ap.passPlaceholder': 'Heslo AP',
    'download.input': 'Zadejte URL vzdáleného obrazu',
    'settings.appearance.layoutMobile': 'Telefon',
    'settings.appearance.layoutModeDesc':
      'Použít v tomto prohlížeči rozvržení pro telefon/dotykové ovládání'
  },
  da: {
    'settings.device.hidOnly': 'HID-Only-tilstand',
    'settings.device.hidOnlyTip':
      'Aktivér HID-Only-tilstand for bedre kompatibilitet, hvis mus og tastatur holder op med at reagere',
    'mouse.hidOnly.title': 'HID-Only-tilstand',
    'mouse.hidOnly.desc':
      'Hvis din mus og dit tastatur holder op med at reagere, og nulstilling af HID ikke hjælper, kan det være et kompatibilitetsproblem mellem NanoKVM og enheden. Prøv at aktivere HID-Only-tilstand for bedre kompatibilitet.',
    'mouse.hidOnly.tip1':
      'Aktivering af HID-Only-tilstand afmonterer den virtuelle disk og det virtuelle netværk',
    'mouse.hidOnly.tip2': 'I HID-Only-tilstand er montering af billeder deaktiveret',
    'mouse.hidOnly.enable': 'Aktivér HID-Only-tilstand',
    'mouse.hidOnly.disable': 'Deaktivér HID-Only-tilstand',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Swap-hukommelse',
    'download.title': 'Hent billeder',
    'settings.appearance.menuBar.remoteDownload': 'Hent ekstern ISO',
    'settings.account.updateBtn': 'Skift',
    'wifi.ap.passPlaceholder': 'AP-adgangskode',
    'wifi.ap.authDescription': 'Indtast venligst AP-adgangskoden for at fortsætte',
    'download.input': "Indtast URL'en til et fjernbillede",
    'settings.appearance.layoutMobile': 'Telefon',
    'settings.appearance.layoutModeDesc': 'Brug telefon-/touchlayout i denne browser'
  },
  de: {
    'settings.device.hidOnly': 'HID-Only-Modus',
    'settings.device.hidOnlyTip':
      'HID-Only-Modus für bessere Kompatibilität aktivieren, wenn Maus und Tastatur nicht mehr reagieren',
    'mouse.hidOnly.title': 'HID-Only-Modus',
    'mouse.hidOnly.desc':
      'Wenn Maus und Tastatur nicht mehr reagieren und ein Zurücksetzen von HID nicht hilft, kann ein Kompatibilitätsproblem zwischen dem NanoKVM und dem Gerät vorliegen. Aktiviere für bessere Kompatibilität den HID-Only-Modus.',
    'mouse.hidOnly.tip1':
      'Beim Aktivieren des HID-Only-Modus werden die virtuelle Festplatte und das virtuelle Netzwerk getrennt',
    'mouse.hidOnly.tip2': 'Im HID-Only-Modus ist das Einbinden von Images deaktiviert',
    'mouse.hidOnly.enable': 'HID-Only-Modus aktivieren',
    'mouse.hidOnly.disable': 'HID-Only-Modus deaktivieren',
    'settings.tailscale.swap.title': 'Swap-Speicher',
    'download.title': 'Abbilder herunterladen',
    'settings.appearance.menuBar.remoteDownload': 'Remote-ISO herunterladen',
    'wifi.ap.passPlaceholder': 'AP-Passwort',
    'wifi.ap.authDescription': 'Bitte geben Sie das AP-Passwort ein, um fortzufahren',
    'settings.appearance.layoutMobile': 'Smartphone',
    'settings.appearance.layoutModeDesc': 'Smartphone-/Touch-Layout in diesem Browser verwenden'
  },
  es: {
    'settings.device.hidOnly': 'Modo HID-Only',
    'settings.device.hidOnlyTip':
      'Activa el modo HID-Only para mejorar la compatibilidad si el ratón y el teclado dejan de responder',
    'mouse.hidOnly.title': 'Modo HID-Only',
    'mouse.hidOnly.desc':
      'Si el ratón y el teclado dejan de responder y restablecer el HID no ayuda, podría tratarse de un problema de compatibilidad entre el NanoKVM y el dispositivo. Prueba a activar el modo HID-Only para mejorar la compatibilidad.',
    'mouse.hidOnly.tip1':
      'Al activar el modo HID-Only se desmontarán el disco virtual y la red virtual',
    'mouse.hidOnly.tip2': 'En el modo HID-Only, el montaje de imágenes está desactivado',
    'mouse.hidOnly.enable': 'Activar el modo HID-Only',
    'mouse.hidOnly.disable': 'Desactivar el modo HID-Only',
    'download.title': 'Descargar imágenes',
    'settings.appearance.menuBar.remoteDownload': 'Descargar ISO remota',
    'settings.account.updateBtn': 'Cambiar',
    'picoclaw.title': 'Asistente PicoClaw',
    'wifi.ap.passPlaceholder': 'Contraseña AP',
    'settings.appearance.layoutMobile': 'Móvil',
    'settings.appearance.layoutModeDesc': 'Usar el diseño de móvil/táctil en este navegador'
  },
  et: {
    'settings.device.hidOnly': 'HID-Only režiim',
    'settings.device.hidOnlyTip':
      'Kui hiir ja klaviatuur lakkavad reageerimast, luba parema ühilduvuse jaoks HID-Only režiim',
    'mouse.hidOnly.title': 'HID-Only režiim',
    'mouse.hidOnly.desc':
      'Kui hiir ja klaviatuur lakkavad reageerimast ning HID lähtestamine ei aita, võib tegu olla NanoKVM-i ja seadme ühilduvusprobleemiga. Parema ühilduvuse jaoks proovi lubada HID-Only režiim.',
    'mouse.hidOnly.tip1':
      'HID-Only režiimi lubamine haagib lahti virtuaalse ketta ja virtuaalvõrgu',
    'mouse.hidOnly.tip2': 'HID-Only režiimis on kujutiste haakimine keelatud',
    'mouse.hidOnly.enable': 'Luba HID-Only režiim',
    'mouse.hidOnly.disable': 'Keela HID-Only režiim',
    'download.title': 'Laadi kujutised alla',
    'settings.appearance.menuBar.remoteDownload': 'Laadi kaug-ISO alla',
    'settings.appearance.layoutMobile': 'Telefon',
    'settings.appearance.layoutModeDesc': 'Kasuta selles brauseris telefoni-/puutepaigutust'
  },
  fi: {
    'settings.device.hidOnly': 'HID-Only-tila',
    'settings.device.hidOnlyTip':
      'Ota HID-Only-tila käyttöön paremman yhteensopivuuden vuoksi, jos hiiri ja näppäimistö lakkaavat reagoimasta',
    'mouse.hidOnly.title': 'HID-Only-tila',
    'mouse.hidOnly.desc':
      'Jos hiiri ja näppäimistö lakkaavat reagoimasta eikä HID:n nollaus auta, kyseessä voi olla NanoKVM:n ja laitteen yhteensopivuusongelma. Kokeile ottaa HID-Only-tila käyttöön paremman yhteensopivuuden vuoksi.',
    'mouse.hidOnly.tip1': 'HID-Only-tilan käyttöönotto irrottaa virtuaalilevyn ja virtuaaliverkon',
    'mouse.hidOnly.tip2': 'HID-Only-tilassa levykuvien liittäminen on pois käytöstä',
    'mouse.hidOnly.enable': 'Ota HID-Only-tila käyttöön',
    'mouse.hidOnly.disable': 'Poista HID-Only-tila käytöstä',
    'download.title': 'Lataa levykuvia',
    'settings.appearance.menuBar.remoteDownload': 'Lataa ISO etänä',
    'settings.appearance.layoutMobile': 'Puhelin',
    'settings.appearance.layoutModeDesc': 'Käytä tässä selaimessa puhelin-/kosketusasettelua'
  },
  fr: {
    'settings.device.hidOnly': 'Mode HID-Only',
    'settings.device.hidOnlyTip':
      'Activez le mode HID-Only pour une meilleure compatibilité si la souris et le clavier ne répondent plus',
    'mouse.hidOnly.title': 'Mode HID-Only',
    'mouse.hidOnly.desc':
      'Si votre souris et votre clavier ne répondent plus et que la réinitialisation du HID n’y change rien, il peut s’agir d’un problème de compatibilité entre le NanoKVM et l’appareil. Essayez d’activer le mode HID-Only pour une meilleure compatibilité.',
    'mouse.hidOnly.tip1':
      'L’activation du mode HID-Only démonte le disque virtuel et le réseau virtuel',
    'mouse.hidOnly.tip2': 'En mode HID-Only, le montage d’images est désactivé',
    'mouse.hidOnly.enable': 'Activer le mode HID-Only',
    'mouse.hidOnly.disable': 'Désactiver le mode HID-Only',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Mémoire swap',
    'download.title': 'Télécharger des images',
    'settings.appearance.menuBar.remoteDownload': 'Télécharger une ISO distante',
    'settings.account.updateBtn': 'Modifier',
    'picoclaw.title': 'Assistant PicoClaw',
    'wifi.ap.passPlaceholder': 'Mot de passe AP',
    'settings.appearance.layoutMobile': 'Téléphone',
    'settings.appearance.layoutModeDesc':
      'Utiliser la disposition téléphone/tactile dans ce navigateur'
  },
  hu: {
    'settings.device.hidOnly': 'HID-Only mód',
    'settings.device.hidOnlyTip':
      'Engedélyezze a HID-Only módot a jobb kompatibilitásért, ha az egér és a billentyűzet nem válaszol',
    'mouse.hidOnly.title': 'HID-Only mód',
    'mouse.hidOnly.desc':
      'Ha az egér és a billentyűzet nem válaszol, és a HID alaphelyzetbe állítása nem segít, a NanoKVM és az eszköz közötti kompatibilitási probléma állhat fenn. A jobb kompatibilitás érdekében próbálja meg engedélyezni a HID-Only módot.',
    'mouse.hidOnly.tip1':
      'A HID-Only mód engedélyezése leválasztja a virtuális lemezt és a virtuális hálózatot',
    'mouse.hidOnly.tip2': 'HID-Only módban a képfájlok csatolása le van tiltva',
    'mouse.hidOnly.enable': 'HID-Only mód engedélyezése',
    'mouse.hidOnly.disable': 'HID-Only mód letiltása',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Swap memória',
    'download.title': 'Képek letöltése',
    'settings.appearance.menuBar.remoteDownload': 'Távoli ISO letöltése',
    'settings.account.updateBtn': 'Módosítás',
    'wifi.ap.passPlaceholder': 'AP-jelszó',
    'wifi.ap.authDescription': 'A folytatáshoz adja meg az AP jelszót',
    'download.input': 'Adja meg egy távoli képfájl URL-jét',
    'settings.appearance.layoutMobile': 'Telefon',
    'settings.appearance.layoutModeDesc':
      'Telefonos/érintéses elrendezés használata ebben a böngészőben'
  },
  id: {
    'settings.device.hidOnly': 'Mode HID-Only',
    'settings.device.hidOnlyTip':
      'Aktifkan mode HID-Only untuk kompatibilitas lebih baik jika mouse dan keyboard berhenti merespons',
    'mouse.hidOnly.title': 'Mode HID-Only',
    'mouse.hidOnly.desc':
      'Jika mouse dan keyboard berhenti merespons dan mereset HID tidak membantu, mungkin ada masalah kompatibilitas antara NanoKVM dan perangkat. Coba aktifkan mode HID-Only untuk kompatibilitas yang lebih baik.',
    'mouse.hidOnly.tip1':
      'Mengaktifkan mode HID-Only akan melepas disk virtual dan jaringan virtual',
    'mouse.hidOnly.tip2': 'Dalam mode HID-Only, pemasangan image dinonaktifkan',
    'mouse.hidOnly.enable': 'Aktifkan mode HID-Only',
    'mouse.hidOnly.disable': 'Nonaktifkan mode HID-Only',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Memori swap',
    'download.title': 'Unduh gambar',
    'settings.appearance.menuBar.remoteDownload': 'Unduh ISO jarak jauh',
    'settings.account.updateBtn': 'Ubah',
    'picoclaw.title': 'Asisten PicoClaw',
    'wifi.ap.passPlaceholder': 'Kata sandi AP',
    'download.input': 'Silakan masukkan URL image jarak jauh',
    'settings.appearance.layoutMobile': 'Ponsel',
    'settings.appearance.layoutModeDesc': 'Gunakan tata letak ponsel/sentuh di browser ini'
  },
  it: {
    'settings.device.hidOnly': 'Modalità HID-Only',
    'settings.device.hidOnlyTip':
      'Abilita la modalità HID-Only per una migliore compatibilità se mouse e tastiera smettono di rispondere',
    'mouse.hidOnly.title': 'Modalità HID-Only',
    'mouse.hidOnly.desc':
      "Se mouse e tastiera smettono di rispondere e il ripristino dell'HID non aiuta, potrebbe trattarsi di un problema di compatibilità tra il NanoKVM e il dispositivo. Prova ad abilitare la modalità HID-Only per una migliore compatibilità.",
    'mouse.hidOnly.tip1':
      'Abilitare la modalità HID-Only smonterà il disco virtuale e la rete virtuale',
    'mouse.hidOnly.tip2': 'Nella modalità HID-Only il montaggio delle immagini è disabilitato',
    'mouse.hidOnly.enable': 'Abilita la modalità HID-Only',
    'mouse.hidOnly.disable': 'Disabilita la modalità HID-Only',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Memoria swap',
    'download.title': 'Scarica immagini',
    'settings.appearance.menuBar.remoteDownload': 'Scarica ISO remota',
    'settings.account.updateBtn': 'Cambia',
    'picoclaw.title': 'Assistente PicoClaw',
    'wifi.ap.passPlaceholder': 'Password AP',
    'download.input': "Inserisci l'URL dell'immagine remota",
    'settings.appearance.layoutMobile': 'Telefono',
    'settings.appearance.layoutModeDesc': 'Usa il layout per telefono/touch in questo browser'
  },
  ja: {
    'settings.device.hidOnly': 'HID-Only モード',
    'settings.device.hidOnlyTip':
      'マウスとキーボードが反応しなくなった場合は、互換性向上のため HID-Only モードを有効にしてください',
    'mouse.hidOnly.title': 'HID-Only モード',
    'mouse.hidOnly.desc':
      'マウスやキーボードが反応しなくなり、HID のリセットでも改善しない場合は、NanoKVM とデバイスの互換性の問題かもしれません。互換性を高めるため、HID-Only モードを有効にしてみてください。',
    'mouse.hidOnly.tip1':
      'HID-Only モードを有効にすると、仮想ディスクと仮想ネットワークがアンマウントされます',
    'mouse.hidOnly.tip2': 'HID-Only モードでは、イメージのマウントは無効です',
    'mouse.hidOnly.enable': 'HID-Only モードを有効化',
    'mouse.hidOnly.disable': 'HID-Only モードを無効化',
    'download.title': 'イメージをダウンロード',
    'settings.appearance.menuBar.remoteDownload': 'リモート ISO をダウンロード',
    'settings.appearance.layoutMobile': 'スマートフォン',
    'settings.appearance.layoutModeDesc':
      'このブラウザーでスマートフォン/タッチ用レイアウトを使用します'
  },
  ko: {
    'settings.device.hidOnly': 'HID-Only 모드',
    'settings.device.hidOnlyTip':
      '마우스와 키보드가 응답하지 않으면 호환성을 높이기 위해 HID-Only 모드를 켜세요',
    'mouse.hidOnly.title': 'HID-Only 모드',
    'mouse.hidOnly.desc':
      '마우스와 키보드가 응답하지 않고 HID를 재설정해도 해결되지 않으면 NanoKVM과 장치 간의 호환성 문제일 수 있습니다. 호환성을 높이려면 HID-Only 모드를 활성화해 보세요.',
    'mouse.hidOnly.tip1':
      'HID-Only 모드를 활성화하면 가상 디스크와 가상 네트워크가 마운트 해제됩니다',
    'mouse.hidOnly.tip2': 'HID-Only 모드에서는 이미지 마운트가 비활성화됩니다',
    'mouse.hidOnly.enable': 'HID-Only 모드 활성화',
    'mouse.hidOnly.disable': 'HID-Only 모드 비활성화',
    'settings.account.updateBtn': '변경',
    'settings.appearance.layoutMobile': '휴대폰',
    'settings.appearance.layoutModeDesc': '이 브라우저에서 휴대폰/터치 레이아웃 사용'
  },
  nb: {
    'settings.device.hidOnly': 'HID-Only-modus',
    'settings.device.hidOnlyTip':
      'Aktiver HID-Only-modus for bedre kompatibilitet hvis musen og tastaturet slutter å svare',
    'mouse.hidOnly.title': 'HID-Only-modus',
    'mouse.hidOnly.desc':
      'Hvis musen og tastaturet slutter å svare og det ikke hjelper å tilbakestille HID, kan det være et kompatibilitetsproblem mellom NanoKVM og enheten. Prøv å aktivere HID-Only-modus for bedre kompatibilitet.',
    'mouse.hidOnly.tip1':
      'Når HID-Only-modus aktiveres, avmonteres den virtuelle disken og det virtuelle nettverket',
    'mouse.hidOnly.tip2': 'I HID-Only-modus er montering av bilder deaktivert',
    'mouse.hidOnly.enable': 'Aktiver HID-Only-modus',
    'mouse.hidOnly.disable': 'Deaktiver HID-Only-modus',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Swap-minne',
    'download.title': 'Last ned bilder',
    'settings.appearance.menuBar.remoteDownload': 'Last ned ekstern ISO',
    'settings.account.updateBtn': 'Endre',
    'wifi.ap.passPlaceholder': 'AP-passord',
    'wifi.ap.authDescription': 'Vennligst skriv inn AP-passordet for å fortsette',
    'download.input': 'Skriv inn URL-en til et eksternt bilde',
    'settings.appearance.layoutMobile': 'Telefon',
    'settings.appearance.layoutModeDesc': 'Bruk telefon-/berøringsoppsett i denne nettleseren'
  },
  nl: {
    'settings.device.hidOnly': 'HID-Only-modus',
    'settings.device.hidOnlyTip':
      'Schakel de HID-Only-modus in voor betere compatibiliteit als muis en toetsenbord niet meer reageren',
    'mouse.hidOnly.title': 'HID-Only-modus',
    'mouse.hidOnly.desc':
      'Als muis en toetsenbord niet meer reageren en het resetten van HID niet helpt, kan het gaan om een compatibiliteitsprobleem tussen de NanoKVM en het apparaat. Probeer de HID-Only-modus in te schakelen voor betere compatibiliteit.',
    'mouse.hidOnly.tip1':
      'Als je de HID-Only-modus inschakelt, worden de virtuele schijf en het virtuele netwerk ontkoppeld',
    'mouse.hidOnly.tip2': 'In de HID-Only-modus is het koppelen van images uitgeschakeld',
    'mouse.hidOnly.enable': 'HID-Only-modus inschakelen',
    'mouse.hidOnly.disable': 'HID-Only-modus uitschakelen',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Swap-geheugen',
    'download.title': 'Afbeeldingen downloaden',
    'settings.appearance.menuBar.remoteDownload': 'ISO op afstand downloaden',
    'settings.account.updateBtn': 'Wijzigen',
    'wifi.ap.passPlaceholder': 'AP-wachtwoord',
    'wifi.ap.authDescription': 'Voer het AP-wachtwoord in om door te gaan',
    'download.input': 'Voer de URL van een externe image in',
    'settings.appearance.layoutMobile': 'Telefoon',
    'settings.appearance.layoutModeDesc': 'Gebruik de telefoon-/touch-indeling in deze browser'
  },
  pl: {
    'settings.device.hidOnly': 'Tryb HID-Only',
    'settings.device.hidOnlyTip':
      'Włącz tryb HID-Only, aby poprawić zgodność, jeśli mysz i klawiatura przestaną reagować',
    'mouse.hidOnly.title': 'Tryb HID-Only',
    'mouse.hidOnly.desc':
      'Jeśli mysz i klawiatura przestaną reagować, a reset HID nie pomaga, może to być problem ze zgodnością między NanoKVM a urządzeniem. Spróbuj włączyć tryb HID-Only, aby poprawić zgodność.',
    'mouse.hidOnly.tip1': 'Włączenie trybu HID-Only odmontuje dysk wirtualny i sieć wirtualną',
    'mouse.hidOnly.tip2': 'W trybie HID-Only montowanie obrazów jest wyłączone',
    'mouse.hidOnly.enable': 'Włącz tryb HID-Only',
    'mouse.hidOnly.disable': 'Wyłącz tryb HID-Only',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Pamięć swap',
    'download.title': 'Pobierz obrazy',
    'settings.appearance.menuBar.remoteDownload': 'Pobierz zdalne ISO',
    'settings.account.updateBtn': 'Zmień',
    'picoclaw.title': 'Asystent PicoClaw',
    'wifi.ap.passPlaceholder': 'Hasło AP',
    'wifi.ap.authDescription': 'Aby kontynuować, wprowadź hasło AP',
    'download.input': 'Wprowadź adres URL zdalnego obrazu',
    'settings.appearance.layoutMobile': 'Telefon',
    'settings.appearance.layoutModeDesc': 'Użyj układu dla telefonu/dotykowego w tej przeglądarce'
  },
  pt_br: {
    'settings.device.hidOnly': 'Modo HID-Only',
    'settings.device.hidOnlyTip':
      'Ative o modo HID-Only para melhor compatibilidade se o mouse e o teclado pararem de responder',
    'mouse.hidOnly.title': 'Modo HID-Only',
    'mouse.hidOnly.desc':
      'Se o mouse e o teclado pararem de responder e redefinir o HID não ajudar, pode haver um problema de compatibilidade entre o NanoKVM e o dispositivo. Tente ativar o modo HID-Only para melhorar a compatibilidade.',
    'mouse.hidOnly.tip1': 'Ativar o modo HID-Only desmontará o disco virtual e a rede virtual',
    'mouse.hidOnly.tip2': 'No modo HID-Only, a montagem de imagens fica desativada',
    'mouse.hidOnly.enable': 'Ativar modo HID-Only',
    'mouse.hidOnly.disable': 'Desativar modo HID-Only',
    'settings.tailscale.swap.title': 'Memória swap',
    'download.title': 'Baixar imagens',
    'settings.appearance.menuBar.remoteDownload': 'Baixar ISO remota',
    'picoclaw.title': 'Assistente PicoClaw',
    'wifi.ap.passPlaceholder': 'Senha AP',
    'settings.appearance.layoutMobile': 'Celular',
    'settings.appearance.layoutModeDesc': 'Usar o layout de celular/toque neste navegador'
  },
  ru: {
    'settings.device.hidOnly': 'Режим HID-Only',
    'settings.device.hidOnlyTip':
      'Включите режим HID-Only для лучшей совместимости, если мышь и клавиатура перестали отвечать',
    'mouse.hidOnly.title': 'Режим HID-Only',
    'mouse.hidOnly.desc':
      'Если мышь и клавиатура перестали отвечать и сброс HID не помогает, возможно, это проблема совместимости между NanoKVM и устройством. Попробуйте включить режим HID-Only для лучшей совместимости.',
    'mouse.hidOnly.tip1': 'Включение режима HID-Only отключит виртуальный диск и виртуальную сеть',
    'mouse.hidOnly.tip2': 'В режиме HID-Only монтирование образов отключено',
    'mouse.hidOnly.enable': 'Включить режим HID-Only',
    'mouse.hidOnly.disable': 'Выключить режим HID-Only',
    'settings.tailscale.swap.title': 'Подкачка памяти',
    'settings.account.updateBtn': 'Изменить',
    'picoclaw.title': 'Ассистент PicoClaw',
    'wifi.ap.passPlaceholder': 'Пароль AP',
    'settings.appearance.layoutMobile': 'Телефон',
    'settings.appearance.layoutModeDesc':
      'Использовать интерфейс для телефона/сенсорного экрана в этом браузере'
  },
  se: {
    'settings.device.hidOnly': 'HID-Only-läge',
    'settings.device.hidOnlyTip':
      'Aktivera HID-Only-läge för bättre kompatibilitet om musen och tangentbordet slutar svara',
    'mouse.hidOnly.title': 'HID-Only-läge',
    'mouse.hidOnly.desc':
      'Om musen och tangentbordet slutar svara och det inte hjälper att återställa HID kan det vara ett kompatibilitetsproblem mellan NanoKVM och enheten. Försök aktivera HID-Only-läge för bättre kompatibilitet.',
    'mouse.hidOnly.tip1':
      'När HID-Only-läge aktiveras avmonteras den virtuella disken och det virtuella nätverket',
    'mouse.hidOnly.tip2': 'I HID-Only-läge är montering av avbildningar inaktiverad',
    'mouse.hidOnly.enable': 'Aktivera HID-Only-läge',
    'mouse.hidOnly.disable': 'Inaktivera HID-Only-läge',
    'settings.tailscale.swap.title': 'Swap-minne',
    'download.title': 'Hämta avbildningar',
    'settings.appearance.menuBar.remoteDownload': 'Hämta ISO på distans',
    'wifi.ap.passPlaceholder': 'AP-lösenord',
    'wifi.ap.authDescription': 'Ange AP-lösenordet för att fortsätta',
    'settings.appearance.layoutMobile': 'Telefon',
    'settings.appearance.layoutModeDesc': 'Använd telefon-/touchlayout i den här webbläsaren'
  },
  th: {
    'settings.device.hidOnly': 'โหมด HID-Only',
    'settings.device.hidOnlyTip':
      'เปิดโหมด HID-Only เพื่อความเข้ากันได้ที่ดีขึ้น หากเมาส์และแป้นพิมพ์หยุดตอบสนอง',
    'mouse.hidOnly.title': 'โหมด HID-Only',
    'mouse.hidOnly.desc':
      'หากเมาส์และคีย์บอร์ดไม่ตอบสนองและการรีเซ็ต HID ไม่ช่วย อาจเป็นปัญหาความเข้ากันได้ระหว่าง NanoKVM กับอุปกรณ์ ลองเปิดโหมด HID-Only เพื่อให้เข้ากันได้ดีขึ้น',
    'mouse.hidOnly.tip1': 'การเปิดโหมด HID-Only จะเลิกเมานต์ดิสก์จำลองและเครือข่ายจำลอง',
    'mouse.hidOnly.tip2': 'ในโหมด HID-Only การเมานต์อิมเมจจะถูกปิดใช้งาน',
    'mouse.hidOnly.enable': 'เปิดใช้งานโหมด HID-Only',
    'mouse.hidOnly.disable': 'ปิดใช้งานโหมด HID-Only',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'หน่วยความจำ Swap',
    'download.title': 'ดาวน์โหลด Disk Image',
    'settings.account.updateBtn': 'เปลี่ยน',
    'picoclaw.title': 'ผู้ช่วย PicoClaw',
    'wifi.ap.passPlaceholder': 'รหัสผ่าน AP',
    'settings.appearance.layoutMobile': 'โทรศัพท์',
    'settings.appearance.layoutModeDesc': 'ใช้เลย์เอาต์โทรศัพท์/สัมผัสในเบราว์เซอร์นี้'
  },
  tr: {
    'settings.device.hidOnly': 'HID-Only modu',
    'settings.device.hidOnlyTip':
      'Fare ve klavye yanıt vermeyi bırakırsa daha iyi uyumluluk için HID-Only modunu etkinleştirin',
    'mouse.hidOnly.title': 'HID-Only modu',
    'mouse.hidOnly.desc':
      "Fare ve klavye yanıt vermeyi bırakır ve HID'i sıfırlamak yardımcı olmazsa, NanoKVM ile cihaz arasında bir uyumluluk sorunu olabilir. Daha iyi uyumluluk için HID-Only modunu etkinleştirmeyi deneyin.",
    'mouse.hidOnly.tip1':
      'HID-Only modunu etkinleştirmek sanal diski ve sanal ağı bağlantıdan çıkarır',
    'mouse.hidOnly.tip2': 'HID-Only modunda imaj bağlama devre dışıdır',
    'mouse.hidOnly.enable': 'HID-Only modunu etkinleştir',
    'mouse.hidOnly.disable': 'HID-Only modunu devre dışı bırak',
    'settings.tailscale.swap.title': 'Swap belleği',
    'download.title': 'Disk imajı indir',
    'settings.appearance.menuBar.remoteDownload': 'Uzak ISO indir',
    'picoclaw.title': 'PicoClaw Asistanı',
    'wifi.ap.passPlaceholder': 'AP şifresi',
    'settings.appearance.layoutMobile': 'Telefon',
    'settings.appearance.layoutModeDesc': 'Bu tarayıcıda telefon/dokunmatik yerleşimi kullan'
  },
  uk: {
    'settings.device.hidOnly': 'Режим HID-Only',
    'settings.device.hidOnlyTip':
      'Увімкніть режим HID-Only для кращої сумісності, якщо миша та клавіатура перестали відповідати',
    'mouse.hidOnly.title': 'Режим HID-Only',
    'mouse.hidOnly.desc':
      'Якщо миша та клавіатура перестали відповідати, а скидання HID не допомагає, це може бути проблема сумісності між NanoKVM і пристроєм. Спробуйте ввімкнути режим HID-Only для кращої сумісності.',
    'mouse.hidOnly.tip1':
      'Увімкнення режиму HID-Only відмонтує віртуальний диск і віртуальну мережу',
    'mouse.hidOnly.tip2': 'У режимі HID-Only монтування образів вимкнено',
    'mouse.hidOnly.enable': 'Увімкнути режим HID-Only',
    'mouse.hidOnly.disable': 'Вимкнути режим HID-Only',
    'settings.tailscale.swap.title': "Підкачка пам'яті",
    'download.title': 'Завантажити образи',
    'settings.appearance.menuBar.remoteDownload': 'Завантажити ISO віддалено',
    'settings.account.updateBtn': 'Змінити',
    'picoclaw.title': 'Помічник PicoClaw',
    'wifi.ap.passPlaceholder': 'Пароль AP',
    'settings.appearance.layoutMobile': 'Телефон',
    'settings.appearance.layoutModeDesc':
      'Використовувати інтерфейс для телефона/сенсорного екрана в цьому браузері'
  },
  vi: {
    'settings.device.hidOnly': 'Chế độ HID-Only',
    'settings.device.hidOnlyTip':
      'Bật chế độ HID-Only để tương thích tốt hơn nếu chuột và bàn phím ngừng phản hồi',
    'mouse.hidOnly.title': 'Chế độ HID-Only',
    'mouse.hidOnly.desc':
      'Nếu chuột và bàn phím ngừng phản hồi và việc đặt lại HID không có tác dụng, có thể là sự cố tương thích giữa NanoKVM và thiết bị. Hãy thử bật chế độ HID-Only để tương thích tốt hơn.',
    'mouse.hidOnly.tip1': 'Bật chế độ HID-Only sẽ gỡ đĩa ảo và mạng ảo',
    'mouse.hidOnly.tip2': 'Trong chế độ HID-Only, tính năng gắn image bị tắt',
    'mouse.hidOnly.enable': 'Bật chế độ HID-Only',
    'mouse.hidOnly.disable': 'Tắt chế độ HID-Only',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Bộ nhớ swap',
    'download.title': 'Tải xuống hình ảnh',
    'settings.account.updateBtn': 'Đổi',
    'picoclaw.title': 'Trợ lý PicoClaw',
    'wifi.ap.passPlaceholder': 'Mật khẩu AP',
    'download.input': 'Vui lòng nhập URL của image từ xa',
    'settings.appearance.layoutMobile': 'Điện thoại',
    'settings.appearance.layoutModeDesc': 'Dùng bố cục điện thoại/cảm ứng trong trình duyệt này'
  },
  zh: {
    'settings.device.hidOnly': 'HID-Only 模式',
    'settings.device.hidOnlyTip': '如果鼠标和键盘停止响应，请启用 HID-Only 模式以获得更好的兼容性',
    'mouse.hidOnly.title': 'HID-Only 模式',
    'mouse.hidOnly.desc':
      '如果鼠标和键盘停止响应，且重置 HID 无效，可能是 NanoKVM 与设备之间存在兼容性问题。请尝试启用 HID-Only 模式以获得更好的兼容性。',
    'mouse.hidOnly.tip1': '启用 HID-Only 模式将卸载虚拟磁盘和虚拟网络',
    'mouse.hidOnly.tip2': '在 HID-Only 模式下，镜像挂载被禁用',
    'mouse.hidOnly.enable': '启用 HID-Only 模式',
    'mouse.hidOnly.disable': '停用 HID-Only 模式',
    'settings.device.swap.title': 'Swap',
    'settings.tailscale.swap.title': 'Swap 内存',
    'settings.appearance.layoutMobile': '手机',
    'settings.appearance.layoutModeDesc': '在此浏览器中使用手机/触控布局'
  },
  zh_tw: {
    'settings.device.hidOnly': 'HID-Only 模式',
    'settings.device.hidOnlyTip': '如果滑鼠和鍵盤停止回應，請啟用 HID-Only 模式以獲得更好的相容性',
    'mouse.hidOnly.title': 'HID-Only 模式',
    'mouse.hidOnly.desc':
      '如果滑鼠和鍵盤停止回應，且重設 HID 無效，可能是 NanoKVM 與裝置之間存在相容性問題。請嘗試啟用 HID-Only 模式以獲得更好的相容性。',
    'mouse.hidOnly.tip1': '啟用 HID-Only 模式將卸載虛擬磁碟和虛擬網路',
    'mouse.hidOnly.tip2': '在 HID-Only 模式下，映像檔掛載會被停用',
    'mouse.hidOnly.enable': '啟用 HID-Only 模式',
    'mouse.hidOnly.disable': '停用 HID-Only 模式',
    'settings.tailscale.swap.title': 'Swap 記憶體',
    'download.title': '下載映像檔',
    'settings.appearance.layoutMobile': '手機',
    'settings.appearance.layoutModeDesc': '在此瀏覽器中使用手機/觸控佈局'
  }
};
