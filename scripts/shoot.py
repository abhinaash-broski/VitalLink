import sys, asyncio
from playwright.async_api import async_playwright
# usage: shoot.py base outdir w h path:name ...
async def main():
    base, out, w, h = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/opt/pw-browsers/chromium" if False else None)
        pg = await b.new_page(viewport={"width": w, "height": h})
        msgs=[]
        pg.on("console", lambda m: msgs.append(f"{m.type}: {m.text}"))
        pg.on("pageerror", lambda e: msgs.append(f"pageerror: {e}"))
        for spec in sys.argv[5:]:
            path, name = spec.split(":")
            await pg.goto(base + path); await pg.wait_for_timeout(700)
            await pg.screenshot(path=f"{out}/{name}.png", full_page=True)
        print("\n".join(msgs) or "no console output")
        await b.close()
asyncio.run(main())
