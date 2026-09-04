import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * CivicAI client store.
 *
 * This is the single place the UI reads/writes app data. It is deliberately
 * shaped like the future API service layer (users, accounts, transactions,
 * cards, recipients, subscriptions, notifications) so a real licensed banking
 * provider + server backend can replace the implementation without touching
 * any screen. No real money moves here — this is a sandbox provider.
 */

export type Currency = "MRU" | "USD" | "EUR" | "GBP";

export type TxType = "payment" | "transfer" | "topup" | "card" | "subscription";
export type TxStatus = "completed" | "pending" | "failed" | "cancelled";

export type Transaction = {
  id: string;
  name: string;
  type: TxType;
  subtitle: string;
  amount: number; // negative = debit
  currency: Currency;
  date: string; // ISO
  status: TxStatus;
  method: string;
  rate?: number;
  fee?: number;
  logo?: string; // emoji/letter fallback
  brand?: string; // brand key for logo mark
};

export type Recipient = {
  id: string;
  name: string;
  contact: string;
  country: string;
  currency: Currency;
};

export type CardModel = {
  id: string;
  label: string;
  last4: string;
  expires: string;
  balance: number;
  currency: Currency;
  frozen: boolean;
  monthlyLimit: number;
  perTxLimit: number;
};

export type Subscription = {
  id: string;
  name: string;
  brand: string;
  amount: number;
  currency: Currency;
  frequency: "monthly" | "yearly";
  nextPayment: string;
  paused: boolean;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
  kind: "payment" | "transfer" | "topup" | "card" | "security" | "subscription";
};

export type Session = { phone: string; name: string; email: string } | null;

export const RATES: Record<Currency, number> = {
  MRU: 1,
  USD: 39.52,
  EUR: 42.8,
  GBP: 49.9,
};

export const FEES = { transferFlat: 25, topupPct: 0 };

export function convert(amount: number, from: Currency, to: Currency) {
  const mru = amount * RATES[from];
  return mru / RATES[to];
}

export function formatMoney(n: number, currency: Currency) {
  return `${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
}

type State = {
  session: Session;
  onboarded: boolean;
  balance: number;
  transactions: Transaction[];
  recipients: Recipient[];
  cards: CardModel[];
  subscriptions: Subscription[];
  notifications: AppNotification[];
  biometric: boolean;
};

const now = Date.now();
const iso = (daysAgo: number, h = 10, m = 24) =>
  new Date(now - daysAgo * 86400000).toISOString().slice(0, 11) +
  `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00.000Z`;

const initial: State = {
  session: null,
  onboarded: false,
  balance: 15450,
  biometric: false,
  transactions: [
    {
      id: "TX-100241",
      name: "Netflix",
      brand: "netflix",
      type: "subscription",
      subtitle: "Subscription",
      amount: -10.99,
      currency: "USD",
      date: iso(0, 10, 24),
      status: "completed",
      method: "CivicAI Virtual Card",
      rate: 39.52,
      fee: 0,
    },
    {
      id: "TX-100240",
      name: "Amazon.com",
      brand: "amazon",
      type: "payment",
      subtitle: "Payment",
      amount: -25.5,
      currency: "USD",
      date: iso(1, 20, 15),
      status: "completed",
      method: "CivicAI Virtual Card",
      rate: 39.52,
      fee: 0,
    },
    {
      id: "TX-100239",
      name: "Apple Store",
      brand: "apple",
      type: "payment",
      subtitle: "Payment",
      amount: -4.99,
      currency: "USD",
      date: iso(6, 9, 40),
      status: "completed",
      method: "CivicAI Virtual Card",
      rate: 39.52,
      fee: 0,
    },
    {
      id: "TX-100238",
      name: "Top Up",
      brand: "topup",
      type: "topup",
      subtitle: "Bank Transfer",
      amount: 100,
      currency: "MRU",
      date: iso(8, 16, 30),
      status: "completed",
      method: "BMCI Bank",
      fee: 0,
    },
  ],
  recipients: [
    { id: "r1", name: "John Smith", contact: "john.smith@email.com", country: "United States", currency: "USD" },
    { id: "r2", name: "Marie Dupont", contact: "marie.dupont@email.fr", country: "France", currency: "EUR" },
    { id: "r3", name: "Ahmed Ould Sidi", contact: "+222 44 55 66 77", country: "Mauritania", currency: "MRU" },
  ],
  cards: [
    {
      id: "c1",
      label: "CivicAI Virtual Card",
      last4: "4242",
      expires: "06/28",
      balance: 389.23,
      currency: "USD",
      frozen: false,
      monthlyLimit: 2000,
      perTxLimit: 500,
    },
  ],
  subscriptions: [
    { id: "s1", name: "Netflix", brand: "netflix", amount: 10.99, currency: "USD", frequency: "monthly", nextPayment: iso(-12), paused: false },
    { id: "s2", name: "Spotify", brand: "spotify", amount: 5.99, currency: "USD", frequency: "monthly", nextPayment: iso(-4), paused: false },
    { id: "s3", name: "Amazon Prime", brand: "amazon", amount: 8.99, currency: "USD", frequency: "monthly", nextPayment: iso(-20), paused: false },
    { id: "s4", name: "Apple iCloud", brand: "apple", amount: 2.99, currency: "USD", frequency: "monthly", nextPayment: iso(-9), paused: true },
    { id: "s5", name: "Microsoft 365", brand: "microsoft", amount: 69.99, currency: "USD", frequency: "yearly", nextPayment: iso(-120), paused: false },
  ],
  notifications: [
    { id: "n1", title: "Payment successful", body: "Netflix — 10.99 USD", date: iso(0, 10, 24), read: false, kind: "payment" },
    { id: "n2", title: "Card payment", body: "Amazon.com — 25.50 USD", date: iso(1, 20, 15), read: false, kind: "card" },
    { id: "n3", title: "Top up received", body: "+100.00 MRU from BMCI Bank", date: iso(8, 16, 30), read: true, kind: "topup" },
    { id: "n4", title: "Security alert", body: "New device signed in to your account", date: iso(9, 8, 5), read: true, kind: "security" },
  ],
};

type Ctx = State & {
  ready: boolean;
  login: (phone: string) => void;
  logout: () => void;
  finishOnboarding: () => void;
  addTransaction: (tx: Transaction) => void;
  sendMoney: (args: {
    amount: number;
    from: Currency;
    to: Currency;
    recipient: Recipient;
    purpose: string;
  }) => Transaction;
  topUp: (amount: number, source: string) => Transaction;
  payMerchant: (merchant: string, amount: number, currency: Currency) => Transaction;
  toggleFreeze: (id: string) => void;
  addCard: () => void;
  updateLimits: (id: string, monthly: number, perTx: number) => void;
  addRecipient: (r: Omit<Recipient, "id">) => void;
  updateRecipient: (r: Recipient) => void;
  deleteRecipient: (id: string) => void;
  toggleSubscription: (id: string) => void;
  cancelSubscription: (id: string) => void;
  markAllRead: () => void;
  setBiometric: (v: boolean) => void;
};

const StoreContext = createContext<Ctx | null>(null);

const KEY = "civicai.state.v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupted state */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const value = useMemo<Ctx>(() => {
    const notify = (n: Omit<AppNotification, "id" | "date" | "read">): AppNotification => ({
      ...n,
      id: `n${Math.random().toString(36).slice(2, 9)}`,
      date: new Date().toISOString(),
      read: false,
    });

    return {
      ...state,
      ready,
      login: (phone) =>
        setState((s) => ({
          ...s,
          session: { phone, name: "Mohamed Ould Ahmed", email: "m.ahmed@email.com" },
        })),
      logout: () => setState((s) => ({ ...s, session: null })),
      finishOnboarding: () => setState((s) => ({ ...s, onboarded: true })),
      addTransaction: (tx) =>
        setState((s) => ({ ...s, transactions: [tx, ...s.transactions] })),
      sendMoney: ({ amount, from, to, recipient, purpose }) => {
        const fee = FEES.transferFlat;
        const totalMru = amount * RATES[from] + fee;
        const tx: Transaction = {
          id: `TX-${Math.floor(100000 + Math.random() * 899999)}`,
          name: recipient.name,
          brand: "transfer",
          type: "transfer",
          subtitle: purpose,
          amount: -amount,
          currency: from,
          date: new Date().toISOString(),
          status: "completed",
          method: "CivicAI Balance",
          rate: RATES[to] / RATES[from],
          fee,
        };
        setState((s) => ({
          ...s,
          balance: s.balance - totalMru,
          transactions: [tx, ...s.transactions],
          notifications: [
            notify({
              title: "Transfer sent",
              body: `${formatMoney(convert(amount, from, to), to)} → ${recipient.name}`,
              kind: "transfer",
            }),
            ...s.notifications,
          ],
        }));
        return tx;
      },
      topUp: (amount, source) => {
        const tx: Transaction = {
          id: `TX-${Math.floor(100000 + Math.random() * 899999)}`,
          name: "Top Up",
          brand: "topup",
          type: "topup",
          subtitle: source,
          amount,
          currency: "MRU",
          date: new Date().toISOString(),
          status: "completed",
          method: source,
          fee: 0,
        };
        setState((s) => ({
          ...s,
          balance: s.balance + amount,
          transactions: [tx, ...s.transactions],
          notifications: [
            notify({ title: "Top up received", body: formatMoney(amount, "MRU"), kind: "topup" }),
            ...s.notifications,
          ],
        }));
        return tx;
      },
      payMerchant: (merchant, amount, currency) => {
        const tx: Transaction = {
          id: `TX-${Math.floor(100000 + Math.random() * 899999)}`,
          name: merchant,
          brand: "merchant",
          type: "payment",
          subtitle: "Payment",
          amount: -amount,
          currency,
          date: new Date().toISOString(),
          status: "completed",
          method: "CivicAI Virtual Card",
          rate: currency === "MRU" ? 1 : RATES[currency],
          fee: 0,
        };
        setState((s) => ({
          ...s,
          balance: s.balance - amount * RATES[currency],
          transactions: [tx, ...s.transactions],
          notifications: [
            notify({ title: "Payment successful", body: `${merchant} — ${formatMoney(amount, currency)}`, kind: "payment" }),
            ...s.notifications,
          ],
        }));
        return tx;
      },
      toggleFreeze: (id) =>
        setState((s) => ({
          ...s,
          cards: s.cards.map((c) => (c.id === id ? { ...c, frozen: !c.frozen } : c)),
        })),
      addCard: () =>
        setState((s) => ({
          ...s,
          cards: [
            ...s.cards,
            {
              id: `c${s.cards.length + 1}`,
              label: "CivicAI Virtual Card",
              last4: String(Math.floor(1000 + Math.random() * 8999)),
              expires: "09/29",
              balance: 0,
              currency: "USD",
              frozen: false,
              monthlyLimit: 1000,
              perTxLimit: 300,
            },
          ],
        })),
      updateLimits: (id, monthly, perTx) =>
        setState((s) => ({
          ...s,
          cards: s.cards.map((c) =>
            c.id === id ? { ...c, monthlyLimit: monthly, perTxLimit: perTx } : c,
          ),
        })),
      addRecipient: (r) =>
        setState((s) => ({
          ...s,
          recipients: [...s.recipients, { ...r, id: `r${Math.random().toString(36).slice(2, 8)}` }],
        })),
      updateRecipient: (r) =>
        setState((s) => ({
          ...s,
          recipients: s.recipients.map((x) => (x.id === r.id ? r : x)),
        })),
      deleteRecipient: (id) =>
        setState((s) => ({ ...s, recipients: s.recipients.filter((x) => x.id !== id) })),
      toggleSubscription: (id) =>
        setState((s) => ({
          ...s,
          subscriptions: s.subscriptions.map((x) =>
            x.id === id ? { ...x, paused: !x.paused } : x,
          ),
        })),
      cancelSubscription: (id) =>
        setState((s) => ({ ...s, subscriptions: s.subscriptions.filter((x) => x.id !== id) })),
      markAllRead: () =>
        setState((s) => ({
          ...s,
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),
      setBiometric: (v) => setState((s) => ({ ...s, biometric: v })),
    };
  }, [state, ready]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
