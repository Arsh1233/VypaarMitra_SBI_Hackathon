import sys
import os

CHAOS_FLAG_FILE = "chaos.flag"

def enable_chaos():
    with open(CHAOS_FLAG_FILE, "w") as f:
        f.write("1")
    print("Chaos monkey enabled: Injecting 10s delay to MCA API for 50% of requests.")

def disable_chaos():
    if os.path.exists(CHAOS_FLAG_FILE):
        os.remove(CHAOS_FLAG_FILE)
    print("Chaos monkey disabled.")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "disable":
        disable_chaos()
    else:
        enable_chaos()
