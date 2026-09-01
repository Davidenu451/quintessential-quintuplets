# 🚀 Guida Netlify Auto-Deployment

## Passo 1: Installa Git
- Scarica da: https://git-scm.com/download/win
- Installa con le opzioni predefinite

## Passo 2: Accedi a GitHub
- Vai su https://github.com/signup
- Crea un account (o accedi se hai già account)

## Passo 3: Crea nuovo Repository su GitHub
1. Vai a https://github.com/new
2. Inserisci nome repository: `quintessential-quintuplets`
3. Descrizione: `Premium anime website for The Quintessential Quintuplets`
4. Seleziona **Public** 
5. Clicca **Create repository**

## Passo 4: Carica il progetto su GitHub
Apri PowerShell nella cartella del progetto e esegui:

```powershell
cd "d:\Siti\The Quintessential Quintuplets"
git init
git add .
git commit -m "Initial premium quintuplets website with all features"
git branch -M main
git remote add origin https://github.com/Davidenu451/quintessential-quintuplets.git
git push -u origin main
```

*(Sostituisci TUO_USERNAME con il tuo username GitHub)*

## Passo 5: Collega a Netlify
1. Vai a https://netlify.com
2. Clicca **Sign up** (oppure accedi)
3. Seleziona **GitHub** per l'autenticazione
4. Clicca **New site from Git**
5. Seleziona **GitHub**
6. Cerca e seleziona il repository `quintessential-quintuplets`
7. Build settings:
   - **Build command**: (lascia vuoto - è un sito statico)
   - **Publish directory**: `.` (radice del progetto)
8. Clicca **Deploy site**

## Passo 6: Auto-Deploy (Già Configurato!)
Il file `netlify.toml` è già presente e configurato. Ogni volta che farai `git push`:
- Netlify rilevà automaticamente il cambio
- Redeploy del sito
- Il sito va online in ~30-60 secondi

## Link finale
Il tuo sito sarà disponibile a:
```
https://quintessential-quintuplets.netlify.app
```
*(O con un dominio personalizzato)*

## Per Aggiornamenti Futuri
Dopo aver apportato modifiche:
```powershell
git add .
git commit -m "Descrizione del cambio"
git push
```

**Done! ✨ Il sito è live con auto-deploy!**
