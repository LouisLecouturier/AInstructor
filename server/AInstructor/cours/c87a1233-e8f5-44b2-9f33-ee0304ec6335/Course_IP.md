Présentation du
Protocole IP

Comment adresser un poste dans
une infrastructure mondiale ?
1Contenu de ce cours.

Découverte et description du protocole IP
• Protocole IP
• IP, Internet Protocol
• Adressage IP V4
• Rôle des tables de routage IP
2Prés requis.

Principes de communication
• Les réseaux locaux par l’exemple

Principes de fonctionnement du protocole Ethernet
3Réseaux informatiques.

Protocole IP
 IP, Internet Protocol
4IP, Internet Protocol (1).

Envoyer une donnée d’un ordinateur à l’autre :
Destination
Source
5IP, Internet Protocol (2).

De quoi a-t-on besoin ?
• De réseaux de communication dont les technologies peuvent
être différentes, mais communes au sein de chaque Team de
postes
• D’un standard de communication international commun à tous
les postes (protocole IP)
✓ Être indépendant des technologies de communication
✓ Identifier la source et la destination dans un
environnement international
✓ De transférer les « messages » sous forme de plusieurs
segments
6IP, Internet Protocol (3).

Identifier la source et la destination, transmettre une partie du
message :
TYPE DONNEES 1 Octet
encapsulées
ADRESSE SOURCE 4 Octets
I
Couche n° 3
P
Adr logique + Data’ ADRESSE DESTINATION 4 Octets
…… … Octets
Adr physique + Data’’
0 à 64 K
DONNEES
Octets
Codage / Décodage
Support
7IP, Internet Protocol (4).

Échange d’un datagramme IP de A vers B :
A
C D
Adresse IP source A
Adresse IP destination B
Données
Seul, le poste dont l’adresse se
trouve dans l’entête du
datagramme accepte les données
B
8IP, Internet Protocol (5).

Correspondance des adresses IP et Ethernet :
A
C D
Adresse Ethernet destination B
Adresse Ethernet source A
Adresse IP source A
Adresse IP destination B
Données
Seul, le poste qui se trouve
adressé par les deux protocoles
Ethernet et IP
accepte les données B
9IP, Internet Protocol (6).

Correspondance entre adresses IP et Ethernet :
Adresse Ethernet destination ... !
Adresse Ethernet source … ! Destination
Adresse IP source A
Adresse IP destination B
Données
Source
10Réseaux informatiques.

Protocole IP
❑ IP, Internet Protocol
 Adressage IP V4
11Adressage IP V4 (1).

Adresse d’un poste :
• Configuration d’une adresse :
- Identification d’un poste au niveau international par une
« adresse logique » de 32 bits, soit 4 octets, attribuée
selon des conventions
- Quatre octets notés W.X.Y.Z,
• Notation décimale de l’adresse d’un poste 192.168.34.128
12Adressage IP V4 (2).

Adresse d’un poste (suite) :
• Masque d’une adresse :
- Convention de subdivision de l’espace d’adressage,
- Identification du réseau auquel appartiennent les postes,
- Allocation de Teams d’adresses contiguës,
- Quatre octets de masque notés W’.X’.Y’.Z’ ou /n
• Notation décimale du masque d’un poste 255.255.255.0 ou /24
13Adressage IP V4 (3).

Adresse d’un poste (suite) :
• Rôle du masque :
- 192.168.34.128 255.255.255.0 ou 192.168.34.128 / 24
- Adresse = 1100 0000 . 1010 1000 . 0010 0010 . 1000 0000
- Masque = 1111 1111 . 1111 1111 . 1111 1111 . 0000 0000
1 : plage de l’adresse du réseau
0 : plage des adresses des postes
14Adressage IP V4 (4).

Adresse de réseau – adresse locale de poste :
• Masquage d’une adresse
- Adresse « opération logique » Masque
• 192.168.34.128 / 24
Adresse = 1100 0000 . 1010 1000 . 0010 0010 . 1000 0000
& Masque = 1111 1111 . 1111 1111 . 1111 1111 . 0000 0000
Réseau = 1100 0000 . 1010 1000 . 0010 0010 . 0000 0000
Adresse du réseau associé = 192.168.34.0
Numéro du poste dans le réseau associé = 128
15Adressage IP V4 (5).

Classes d’adresses :
• Décomposition de l’espace d’adresses
0.0.0.0 à 255.255.255.255 en différents réseaux
0 1 8 16 24 31
CLASSE A 0 @ RESEAU @ POSTE
CLASSE B 10 @ RESEAU @ POSTE
CLASSE C 110 @ RESEAU @ POSTE
CLASSE D 1110 @ MULTICAST
CLASSE E 1111 @ RESERVE
• Adresse = 192.168.34.128
= 1100 0000 . 1010 1000 . 0010 0010 . 1000 0000
-> Classe C
16Adressage IP V4 (6).

Classes d’adresses (suite) :
• W.X.Y.Z = « adresse réseau » . « adresse poste »,
• Identification d’un poste :
- Classe C : « W.X.Y = adresse réseau » . « Z = adresse poste » / 24
- Classe B : « W.X = adresse réseau » . « Y.Z = adresse poste » / 16
- Classe A : « W = adresse réseau » . « X.Y.Z = adresse poste » / 8
17Adressage IP V4 (7).

Classes d’adresses (suite) :
• W.X.Y.Z = « adresse réseau » . « 0.0… »,
• Inutilisables pour identifier un poste, réservées pour identifier
un réseau :
- Classe C : « adresse réseau » . 0 / 24
- Classe B : « adresse réseau » . 0.0 / 16
- Classe A : « adresse réseau » . 0.0.0 / 8
18Adressage IP V4 (8).

Adresse de broadcast :
• Station : W.X.Y.Z = « adresse réseau » . « 255.255… »,
• Broadcast :
- Classe C : « adresse réseau » . 255 / 24
- Classe B : « adresse réseau » . 255.255 /16
- Classe A : « adresse réseau » . 255.255.255 /8
19Adressage IP V4 (9).

Répartition des adresses :
• Adresses privées :
- Convention arbitraire d’attribution,
- Non routables sur l’Internet, chacun peut les utiliser en privé
sans provoquer « de confusion » au niveau internet :
• Classes A : 10.0.0.0 / 8
• Classes B : de 172.16.0.0 à 172.31.0.0 / 16
169.254.0.0 / 16 (DHCP APIPA)
• Classes C : de 192.168.0.0 à 192.168.255.0 / 24
20Adressage IP V4 (10).

Répartition des adresses (suite) :
• Adresses publiques :
- Routables sur l’Internet, attribuées unitairement par les
organismes habilités,
- Exemples :
• Classe A : 9.0.0.0 / 8
• Classe B : 134.206.0.0 / 16
• Classe C : 192.134.17.0 / 24
21Adressage IP V4 (11).

Adresse de Team de réseaux :
• W.X.Y.Z = « adresse Team » . « 0.0… »,
• Réservées pour identifier un Team de réseaux (dans le cadre
du routage), inutilisables pour identifier un poste,
• La notion de classe « disparait » (classless) :
- « adresse Team » . « 0.0… » / 0 à 32
22Adressage IP V4 (12).

Répartition des adresses (suite) :
• Adresses particulières réservées :
- 127.0.0.1 / 8 (loopback = local host) présente sur toutes
les « stacks » IP pour permettre aux programmes locaux de
communiquer entre eux sans nécessiter d’interface réseau,
- 0.0.0.0 / 0
• Fait référence implicitement à la machine locale,
• Peut induire la confusion avec une adresse non
renseignée, cas du DHCP request,
• Désigne un Team indéterminé de réseaux dans une
table de routage,
• Déconseillé de l’utiliser pour désigner un réseau.
23Réseaux informatiques.

Protocole IP
❑ IP, Internet Protocol
❑ Adressage IP V4
 Rôle des tables de routage IP
24Rôle des tables de routage IP (1).

Définition du plan de routage :
Poste 1 Poste 2 Poste3
eth1 eth2 eth3 eth4
193.50.24.1 / 24 193.50.24.2 / 24 195.8.1.2 / 24 195.8.1.1 / 24
25Rôle des tables de routage IP (2).

Définition du plan de routage (poste 1) :
Poste 1 Poste 2 Poste3
eth1 eth 2 eth3 eth4
193.50.24.1 / 24 193.50.24.2 / 24 195.8.1.2 / 24 195.8.1.1 / 24
Destination Masque Passerelle Interface
193.50.24.0 /24 * eth1
26Rôle des tables de routage IP (3).

Définition du plan de routage (poste 2) :
Poste 1 Poste 2 Poste3
eth1 eth 2 eth3 eth4
193.50.24.1 / 24 193.50.24.2 / 24 195.8.1.2 / 24 195.8.1.1 / 24
Destination Masque Passerelle Interface
193.50.24.0 /24 * eth2
195.8.1.0 /24 * eth3
27Rôle des tables de routage IP (4).

Définition du plan de routage (poste 3) :
Poste 1 Poste 2 Poste3
eth1 eth 2 eth3 eth4
193.50.24.1 / 24 193.50.24.2 / 24 195.8.1.2 / 24 195.8.1.1 / 24
Destination Masque Passerelle Interface
195.8.1.0 /24 * eth4
28Fin.
29