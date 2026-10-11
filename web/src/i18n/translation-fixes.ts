type TranslationMap = Record<string, string>;

// Corrections from the translation review: wrong or stale strings, typos, English that was never translated,
// and keys that had no translation. Applied after every other layer, so it wins over the older extras.
export const translationFixes: Record<string, TranslationMap> = {
  ca: {
    'auth.tips.change4':
      'Si es perd aquesta contrasenya, la recuperació requereix tornar a gravar la targeta SD.',
    'auth.tips.reset3': 'Compte web:',
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
    'auth.tips.reset1':
      "Per recuperar la contrasenya d'aquesta imatge Hardened cal reescriure la targeta SD.",
    'settings.device.diskCancelMount':
      'Activar el disc virtual cancel·la la imatge muntada. Vols continuar?'
  },
  cz: {
    'auth.tips.change4': 'Pokud toto heslo ztratíte, obnova vyžaduje přepsání SD karty.',
    'auth.tips.reset3': 'Webový účet:',
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
    'settings.device.oled.description': 'Vypnout OLED displej po'
  },
  da: {
    'auth.tips.change4': 'Hvis adgangskoden mistes, kræver gendannelse at SD-kortet skrives igen.',
    'auth.tips.reset3': 'Webkonto:',
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
    'image.cancelBtn': 'Nej',
    'script.cancel': 'Nej',
    'power.cancelBtn': 'Nej',
    'settings.device.cancelBtn': 'Nej',
    'settings.account.cancelBtn': 'Nej',
    'screen.frameDetect': 'Billeddetektering',
    'image.usbReconnect': 'Tilslut USB igen',
    'image.usbReconnectSuccess': 'USB tilsluttet igen',
    'image.usbReconnectFailed': 'Kunne ikke tilslutte USB igen',
    'settings.tailscale.refresh': 'Opdater siden',
    'settings.device.oled.description': 'Sluk OLED-skærmen efter'
  },
  de: {
    'auth.tips.change4':
      'Wenn dieses Passwort verloren geht, muss zur Wiederherstellung die SD-Karte neu geschrieben werden.',
    'auth.tips.reset3': 'Web-Konto:',
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
    'auth.tips.reset1':
      'Die Passwort-Wiederherstellung für dieses Hardened-Image erfordert ein erneutes Beschreiben der SD-Karte.',
    'settings.device.diskCancelMount':
      'Das Aktivieren der virtuellen Festplatte bricht das eingebundene Image ab. Fortfahren?'
  },
  es: {
    'auth.tips.change4':
      'Si se pierde esta contraseña, la recuperación requiere volver a grabar la tarjeta SD.',
    'auth.tips.reset3': 'Cuenta web:',
    'auth.illegalPassword':
      'La contraseña debe tener al menos 8 caracteres y no puede contener comillas ni barras',
    'screen.videoDirectTips': 'Activa HTTPS en "Ajustes > Sistema > Red" para usar este modo',
    'download.disabled':
      'Ahora mismo no se pueden descargar ni subir imágenes porque el almacenamiento no es escribible. Si hay una imagen montada, desmóntala y después desactiva el disco virtual para que el almacenamiento vuelva a ser escribible.',
    'auth.illegalUsername': 'El nombre de usuario contiene caracteres no permitidos',
    'keyboard.dropdownRussian': 'Ruso',
    'settings.device.diskDesc': 'Montar la tarjeta SD en el host remoto',
    'auth.tips.reset1':
      'Recuperar la contraseña de esta imagen Hardened requiere volver a escribir la tarjeta SD.',
    'settings.device.diskCancelMount':
      'Activar el disco virtual cancela la imagen montada. ¿Continuar?'
  },
  et: {
    'settings.device.diskDesc': 'Ühenda SD-kaart kaugmasinasse'
  },
  fi: {
    'settings.device.diskDesc': 'Liitä SD-kortti etäkoneeseen'
  },
  fr: {
    'auth.tips.change4':
      'Si ce mot de passe est perdu, la récupération nécessite de réécrire la carte SD.',
    'auth.tips.reset3': 'Compte Web :',
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
    'auth.tips.reset1':
      'La récupération du mot de passe de cette image Hardened nécessite de réécrire la carte SD.',
    'settings.device.diskCancelMount':
      "Activer le disque virtuel annule l'image montée. Continuer ?"
  },
  hu: {
    'auth.tips.change4':
      'Ha ez a jelszó elveszik, a helyreállításhoz újra kell írni az SD-kártyát.',
    'auth.tips.reset3': 'Webes fiók:',
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
    'settings.device.oled.description': 'OLED kijelző kikapcsolása ennyi idő után'
  },
  id: {
    'auth.tips.change4':
      'Jika kata sandi ini hilang, pemulihan memerlukan penulisan ulang kartu SD.',
    'auth.tips.reset3': 'Akun web:',
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
    'settings.device.oled.description': 'Matikan layar OLED setelah'
  },
  it: {
    'auth.tips.change4':
      'Se questa password viene persa, il recupero richiede la riscrittura della scheda SD.',
    'auth.tips.reset3': 'Account web:',
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
      'Gli aggiornamenti online sono bloccati dalla modalità firewall Paranoid',
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
    'settings.device.oled.description': 'Spegni lo schermo OLED dopo'
  },
  ja: {
    'auth.tips.change4': 'このパスワードを失った場合、復旧には SD カードの再書き込みが必要です。',
    'auth.tips.reset3': 'ウェブアカウント：',
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
    'auth.tips.reset1':
      'この Hardened イメージのパスワードを復旧するには、SD カードの再書き込みが必要です。',
    'settings.device.diskCancelMount':
      '仮想ディスクを有効にすると、マウント中のイメージは解除されます。続行しますか？'
  },
  ko: {
    'auth.tips.change4': '이 암호를 잃어버리면 복구하려면 SD 카드를 다시 기록해야 합니다.',
    'auth.tips.reset3': '웹 계정:',
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
    'auth.tips.reset1':
      '이 Hardened 이미지의 비밀번호를 복구하려면 SD 카드를 다시 기록해야 합니다.',
    'settings.device.diskCancelMount':
      '가상 디스크를 활성화하면 마운트된 이미지가 해제됩니다. 계속하시겠습니까?'
  },
  nb: {
    'auth.tips.change4':
      'Hvis dette passordet mistes, krever gjenoppretting at SD-kortet skrives på nytt.',
    'auth.tips.reset3': 'Webkonto:',
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
    'settings.device.oled.description': 'Slå av OLED-skjermen etter'
  },
  nl: {
    'auth.tips.change4':
      'Als dit wachtwoord verloren gaat, moet de SD-kaart opnieuw worden geschreven voor herstel.',
    'auth.tips.reset3': 'Webaccount:',
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
    'auth.tips.reset1':
      'Voor wachtwoordherstel van deze Hardened-image moet de SD-kaart opnieuw worden beschreven.',
    'settings.device.diskCancelMount':
      'Het inschakelen van de virtuele schijf annuleert de gekoppelde image. Doorgaan?',
    'settings.device.oled.description': 'OLED-scherm uitschakelen na'
  },
  pl: {
    'auth.tips.change4':
      'Jeśli to hasło zostanie utracone, odzyskanie dostępu wymaga ponownego zapisania karty SD.',
    'auth.tips.reset3': 'Konto web:',
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
    'settings.device.oled.description': 'Wyłącz ekran OLED po'
  },
  pt_br: {
    'auth.tips.change4': 'Se esta senha for perdida, a recuperação exige regravar o cartão SD.',
    'auth.tips.reset3': 'Conta web:',
    'auth.illegalPassword':
      'A senha deve ter pelo menos 8 caracteres e não pode conter aspas nem barras',
    'screen.videoDirectTips':
      'Ative o HTTPS em "Configurações > Sistema > Rede" para usar este modo',
    'download.disabled':
      'No momento não é possível baixar nem enviar imagens porque o armazenamento não permite gravação. Se houver uma imagem montada, desmonte-a e depois desative o disco virtual para que o armazenamento volte a permitir gravação.',
    'settings.device.usbWakeup': 'Ativação por USB',
    'settings.device.diskDesc': 'Montar o cartão SD no host remoto',
    'auth.tips.reset1': 'A recuperação da senha desta imagem Hardened exige regravar o cartão SD.',
    'settings.device.diskCancelMount': 'Ativar o disco virtual cancela a imagem montada. Continuar?'
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
    'auth.tips.reset1':
      'Для восстановления пароля в этом образе Hardened необходимо перезаписать SD-карту.',
    'settings.device.diskCancelMount':
      'Включение виртуального диска отменит смонтированный образ. Продолжить?'
  },
  se: {
    'auth.tips.change4': 'Om lösenordet förloras kräver återställning att SD-kortet skrivs om.',
    'auth.tips.reset3': 'Webbkonto:',
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
    'auth.tips.reset1':
      'Återställning av lösenordet för den här Hardened-avbildningen kräver att SD-kortet skrivs om.',
    'settings.device.diskCancelMount':
      'Om du aktiverar den virtuella disken avbryts den monterade avbildningen. Fortsätta?'
  },
  th: {
    'auth.tips.change4': 'หากรหัสผ่านนี้หาย การกู้คืนต้องเขียนการ์ด SD ใหม่',
    'auth.tips.reset3': 'บัญชีเว็บ:',
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
    'auth.tips.reset2': 'สำหรับวิธีแบบลงลึก โปรดอ่าน:',
    'keyboard.shortcut.clear': 'ล้าง',
    'screen.resolution': 'ความละเอียด',
    'settings.device.diskDesc': 'เมานต์การ์ด SD บนโฮสต์ระยะไกล',
    'auth.tips.reset1': 'การกู้คืนรหัสผ่านของอิมเมจ Hardened นี้ต้องเขียนการ์ด SD ใหม่',
    'settings.device.diskCancelMount':
      'การเปิดดิสก์เสมือนจะยกเลิกการเมานต์อิมเมจ ดำเนินการต่อหรือไม่?'
  },
  tr: {
    'auth.tips.change4': 'Bu parola kaybolursa kurtarma için SD kartın yeniden yazılması gerekir.',
    'auth.tips.reset3': 'Web hesabı:',
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
    'auth.tips.reset1':
      'Bu Hardened imajının parola kurtarması için SD kartın yeniden yazılması gerekir.',
    'settings.device.diskCancelMount':
      'Sanal diski etkinleştirmek bağlı imajı iptal eder. Devam edilsin mi?',
    'wifi.success': "NanoKVM'in ağ durumunu kontrol etmek için cihazın başına gidin.",
    'settings.device.oled.description': 'OLED ekranı şu süreden sonra kapat'
  },
  uk: {
    'auth.tips.change4':
      'Якщо цей пароль буде втрачено, для відновлення потрібно повторно записати SD-карту.',
    'auth.tips.reset3': 'Обліковий запис вебінтерфейсу:',
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
    'auth.tips.reset1':
      'Для відновлення пароля в цьому образі Hardened потрібно перезаписати SD-карту.',
    'settings.device.diskCancelMount':
      'Увімкнення віртуального диска скасує змонтований образ. Продовжити?'
  },
  vi: {
    'auth.tips.change4': 'Nếu mất mật khẩu này, việc khôi phục cần ghi lại thẻ SD.',
    'auth.tips.reset3': 'Tài khoản web:',
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
    'settings.device.oled.description': 'Tắt màn hình OLED sau'
  },
  zh: {
    'auth.tips.change4': '如果此密码丢失，恢复需要重新写入 SD 卡。',
    'auth.tips.reset3': '网页帐号：',
    'auth.illegalPassword': '密码至少 8 个字符，且不能包含引号或斜杠',
    'screen.videoDirectTips': '该模式需启用 HTTPS，请前往「设置 > 系统 > 网络」中开启',
    'download.disabled':
      '当前无法下载或上传镜像，因为存储不可写。如果镜像已挂载，请先卸载，然后关闭虚拟U盘，使存储恢复可写。',
    'settings.tailscale.restart': '确定要重启 Tailscale 吗？',
    'download.inputfile': '请输入镜像文件',
    'settings.device.diskDesc': '在远程主机上挂载 SD 卡',
    'auth.tips.reset1': '恢复此 Hardened 镜像的密码需要重新写入 SD 卡。',
    'settings.device.diskCancelMount': '开启虚拟U盘会取消当前挂载的镜像，是否继续？'
  },
  zh_tw: {
    'auth.tips.change4': '如果此密碼遺失，復原需要重新寫入 SD 卡。',
    'auth.tips.reset3': '網頁帳號：',
    'auth.illegalPassword': '密碼至少 8 個字元，且不能包含引號或斜線',
    'screen.videoDirectTips': '本模式需先啟用 HTTPS，請前往「設定 > 系統 > 網路」中開啟',
    'download.disabled':
      '目前無法下載或上傳映像檔，因為儲存空間不可寫入。若映像檔已掛載，請先卸載，然後關閉虛擬隨身碟，讓儲存空間恢復可寫入。',
    'screen.scale': '縮放',
    'settings.about.imageTip': 'NanoKVM 系統韌體版本',
    'settings.tailscale.upTailscaled': '將 tailscaled 上傳到 NanoKVM 的 /usr/sbin/ 資料夾',
    'screen.video': '影片模式',
    'download.inputfile': '請輸入映像檔',
    'settings.device.diskDesc': '在遠端主機上掛載 SD 卡',
    'auth.tips.reset1': '恢復此 Hardened 映像檔的密碼需要重新寫入 SD 卡。',
    'settings.device.diskCancelMount': '開啟虛擬隨身碟會取消目前掛載的映像檔，是否繼續？'
  }
};
