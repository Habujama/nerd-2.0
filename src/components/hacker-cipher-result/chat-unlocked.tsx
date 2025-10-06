const ChatUnlocked = () => (
    <>
        <h2>Komunikační kanál se zesnulým je přístupný.</h2>
        Otevři Termux a aktivuj komunikační nástroj:
        <ol>
            <li>
                Najdi balíček:
                <code>pm list packages | grep -i bitchat</code>
                (na výstupu uvidíš např. package:tech.permissionless.bitchat)
            </li>
            <li>Spusť aplikaci:
                <code>/system/bin/monkey -p tech.permissionless.bitchat 1</code>
                <br />
                Pokud to nefunguje, zkus:
                <code>cmd activity start -n tech.permissionless.bitchat/.MainActivity</code>
                nebo
                <code>adb shell monkey -p tech.permissionless.bitchat 1</code>
            </li>
        </ol>
    </>
)

export default ChatUnlocked
