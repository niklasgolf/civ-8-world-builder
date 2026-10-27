# 📋 Civilization of Wonders — TODO

### 🛠️ Tekniska förbättringar och framtida utveckling

Detta dokument samlar planerade förbättringar, teknisk skuld och uppgifter som behöver följas upp under utvecklingen av **Civilization of Wonders**.

Syftet är att kunna prioritera utvecklingsarbetet utan att avbryta pågående uppgifter för förändringar som inte är omedelbart nödvändiga.

---

## 🔧 1. Optimera Vites produktionsbygge

**Status:** ⏳ Planerad  
**Prioritet:** 🟡 Normal  
**Område:** Byggsystem och prestanda

### 📌 Bakgrund

Applikationens produktionsbygge genererar för närvarande en JavaScript-fil på cirka **1,87 MB** före gzip-komprimering (cirka 671 kB efter gzip).

Vite har tidigare varnat för att filen överstiger den rekommenderade varningsgränsen på 500 kB.

För att undvika återkommande varningar under den pågående OOP-refaktoreringen har vi tillfälligt höjt gränsen till **2 000 kB**.

### 💻 Nuvarande konfiguration

**Fil:** `vite.config.ts`

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2000
  }
})