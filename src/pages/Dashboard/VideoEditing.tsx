import React, { useState, useRef, useCallback, useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Download,
  Upload,
  FileVideo,
  Scissors,
  Volume2,
  VolumeX,
  Settings,
  Image as ImageIcon,
  Type,
  Music,
  Layers,
  Clock,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Copy,
  Edit,
  Save,
  X,
  Smile,
  Heart,
  Star,
  Sun,
  Moon,
  Zap,
  Crown,
  Coffee,
  Gift,
  Camera,
  Mic,
  Speaker,
  Headphones,
  Calendar,
  MapPin,
  Search,
  Filter,
  Grid,
  List,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Info,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  MoreVertical,
  Home,
  User,
  Mail,
  Phone,
  Globe,
  Link,
  Share,
  Bookmark,
  Flag,
  Tag,
  Archive,
  Folder,
  File,
  FileText,
  Database,
  Server,
  Cloud,
  Wifi,
  Signal,
  Battery,
  Power,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Watch,
  Gamepad2,
  Radio,
  Tv,
  Printer,
  Scanner,
  Keyboard,
  Mouse,
  Webcam,
  PaintBucket,
  Palette,
  Brush,
  Pen,
  Pencil,
  Eraser,
  Ruler,
  Compass,
  Calculator,
  Clock3,
  Timer,
  Stopwatch,
  AlarmClock,
  Hourglass,
  Sunrise,
  Sunset,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Thermometer,
  Umbrella,
  Flashlight,
  Lightbulb,
  Candle,
  Fire,
  Snowflake,
  Droplets,
  Waves,
  Mountain,
  TreePine,
  Flower,
  Leaf,
  Clover,
  Cherry,
  Apple,
  Grape,
  Banana,
  Orange,
  Lemon,
  Watermelon,
  Strawberry,
  Carrot,
  Corn,
  Pizza,
  Hamburger,
  Sandwich,
  Cake,
  Cookie,
  Donut,
  IceCream,
  Candy,
  Chocolate,
  Popcorn,
  Pretzel,
  Bagel,
  Croissant,
  Bread,
  Cheese,
  Egg,
  Bacon,
  Sausage,
  Chicken,
  Fish,
  Shrimp,
  Lobster,
  Crab,
  Octopus,
  Shell,
  Bug,
  Butterfly,
  Bee,
  Spider,
  Snail,
  Turtle,
  Rabbit,
  Cat,
  Dog,
  Bird,
  Elephant,
  Lion,
  Tiger,
  Bear,
  Panda,
  Koala,
  Monkey,
  Fox,
  Wolf,
  Horse,
  Cow,
  Pig,
  Sheep,
  Goat,
  Deer,
  Unicorn,
  Dragon,
  Rocket,
  Airplane,
  Car,
  Bus,
  Train,
  Bike,
  Motorcycle,
  Boat,
  Ship,
  Submarine,
  Helicopter,
  Parachute,
  Anchor,
  Wheel,
  Gear,
  Wrench,
  Hammer,
  Screwdriver,
  Saw,
  Drill,
  Nail,
  Screw,
  Nut,
  Bolt,
  Chain,
  Rope,
  Magnet,
  Key,
  Medal,
  Trophy,
  Award,
  Ribbon,
  Certificate,
  Diploma,
  Graduation,
  School,
  Book,
  Notebook,
  Newspaper,
  Magazine,
  Library,
  Bookmark2,
  Quote,
  Feather,
  Ink,
  Stamp,
  Package,
  Box,
  Gift2,
  Balloon,
  Party,
  Confetti,
  Fireworks,
  Sparkles,
  Glitter,
  Rainbow,
  Prism,
  Crystal,
  Diamond,
  Gem,
  Ring,
  Necklace,
  Bracelet,
  Earrings,
  Crown2,
  Tiara,
  Hat,
  Cap,
  Helmet,
  Mask,
  Glasses,
  Sunglasses,
  Eyepatch,
  Mustache,
  Beard,
  Lipstick,
  Perfume,
  Soap,
  Toothbrush,
  Toothpaste,
  Towel,
  Bathtub,
  Shower,
  Toilet,
  Mirror,
  Comb,
  Scissors2,
  Razor,
  Bandage,
  Pill,
  Syringe,
  Stethoscope,
  Thermometer2,
  XRay,
  Dna,
  Microscope,
  Test,
  Flask,
  Beaker,
  Atom,
  Molecule,
  Magnet2,
  Battery2,
  Plug,
  Socket,
  Switch,
  Remote,
  Joystick,
  Controller,
  Dice,
  Cards,
  Chess,
  Puzzle,
  Toy,
  Doll,
  Robot,
  Alien,
  Ghost,
  Zombie,
  Vampire,
  Witch,
  Wizard,
  Fairy,
  Angel,
  Devil,
  Skull,
  Bone,
  Coffin,
  Grave,
  Church,
  Mosque,
  Temple,
  Synagogue,
  Cross,
  Star2,
  Crescent,
  Yin,
  Yang,
  Peace,
  Love,
  Infinity,
  Recycle,
  Warning,
  Danger,
  Caution,
  Stop,
  Go,
  Slow,
  Fast,
  Speed,
  Brake,
  Gas,
  Fuel,
  Oil,
  Water,
  Electric,
  Solar,
  Wind2,
  Nuclear,
  Coal,
  Fire2,
  Ice,
  Snow,
  Rain,
  Thunder,
  Lightning,
  Storm,
  Tornado,
  Hurricane,
  Earthquake,
  Volcano,
  Flood,
  Drought,
  Desert,
  Forest,
  Jungle,
  Beach,
  Ocean,
  Lake,
  River,
  Waterfall,
  Spring,
  Cave,
  Rock,
  Stone,
  Sand,
  Dirt,
  Grass,
  Moss,
  Vine,
  Branch,
  Log,
  Seed,
  Sprout,
  Bloom,
  Petal,
  Thorn,
  Root,
  Bark,
  Sap,
  Honey,
  Wax,
  Silk,
  Cotton,
  Wool,
  Fur,
  Feather2,
  Scale,
  Claw,
  Fang,
  Horn,
  Antler,
  Tail,
  Wing,
  Fin,
  Gill,
  Eye2,
  Nose,
  Mouth,
  Ear,
  Hand,
  Finger,
  Thumb,
  Nail2,
  Foot,
  Toe,
  Leg,
  Knee,
  Elbow,
  Shoulder,
  Back,
  Chest,
  Stomach,
  Heart2,
  Lung,
  Liver,
  Kidney,
  Brain,
  Nerve,
  Blood,
  Bone2,
  Muscle,
  Skin,
  Hair,
  Beard2,
  Mustache2,
  Eyebrow,
  Eyelash,
  Freckle,
  Mole,
  Scar,
  Wrinkle,
  Dimple,
  Smile2,
  Frown,
  Wink,
  Kiss,
  Hug,
  Handshake,
  Highfive,
  Thumbsup,
  Thumbsdown,
  Clap,
  Wave,
  Point,
  Peace2,
  Victory,
  Pray,
  Namaste,
  Bow,
  Curtsy,
  Salute,
  Dance,
  Jump,
  Run,
  Walk,
  Crawl,
  Sit,
  Stand,
  Lie,
  Sleep,
  Wake,
  Yawn,
  Stretch,
  Exercise,
  Yoga,
  Meditation,
  Breathe,
  Relax,
  Stress,
  Calm,
  Happy,
  Sad,
  Angry,
  Fear,
  Surprise,
  Disgust,
  Contempt,
  Shame,
  Guilt,
  Pride,
  Joy,
  Sorrow,
  Hope,
  Despair,
  Love2,
  Hate,
  Like,
  Dislike,
  Want,
  Need,
  Have,
  Give,
  Take,
  Buy,
  Sell,
  Trade,
  Exchange,
  Borrow,
  Lend,
  Owe,
  Pay,
  Earn,
  Spend,
  Save,
  Invest,
  Profit,
  Loss,
  Rich,
  Poor,
  Cheap,
  Expensive,
  Free,
  Cost,
  Price,
  Value,
  Worth,
  Quality,
  Quantity,
  Size,
  Weight,
  Height,
  Width,
  Length,
  Depth,
  Area,
  Volume,
  Capacity,
  Speed2,
  Distance,
  Time,
  Space,
  Place,
  Location,
  Position,
  Direction,
  North,
  South,
  East,
  West,
  Up,
  Down,
  Left,
  Right,
  Forward,
  Backward,
  Inside,
  Outside,
  Above,
  Below,
  Over,
  Under,
  Near,
  Far,
  Here,
  There,
  Everywhere,
  Nowhere,
  Somewhere,
  Anywhere,
  Always,
  Never,
  Sometimes,
  Often,
  Rarely,
  Usually,
  Maybe,
  Definitely,
  Possibly,
  Probably,
  Certainly,
  Surely,
  Obviously,
  Clearly,
  Exactly,
  Approximately,
  About,
  Around,
  Between,
  Among,
  Through,
  Across,
  Along,
  Against,
  Towards,
  Away,
  Into,
  Out,
  Off,
  On,
  With,
  Without,
  For,
  Against2,
  Because,
  Since,
  Until,
  Before,
  After,
  During,
  While,
  When,
  Where,
  Why,
  How,
  What,
  Who,
  Which,
  Whose,
  Whom,
  That,
  This,
  These,
  Those,
  All,
  Some,
  Any,
  No,
  None,
  Few,
  Many,
  Much,
  Little,
  More,
  Less,
  Most,
  Least,
  Best,
  Worst,
  Better,
  Worse,
  Good,
  Bad,
  Great,
  Terrible,
  Excellent,
  Awful,
  Amazing,
  Horrible,
  Wonderful,
  Dreadful,
  Fantastic,
  Terrible2,
  Incredible,
  Unbelievable,
  Impossible,
  Possible,
  Easy,
  Hard,
  Simple,
  Complex,
  Difficult,
  Challenging,
  Fun,
  Boring,
  Interesting,
  Exciting,
  Thrilling,
  Scary,
  Frightening,
  Terrifying,
  Relaxing,
  Stressful,
  Peaceful,
  Chaotic,
  Quiet,
  Loud,
  Silent,
  Noisy,
  Soft,
  Hard2,
  Smooth,
  Rough,
  Sharp,
  Dull,
  Bright,
  Dark,
  Light,
  Heavy,
  Thick,
  Thin,
  Wide,
  Narrow,
  Tall,
  Short,
  Long,
  Brief,
  Quick,
  Slow2,
  Fast2,
  Early,
  Late,
  New,
  Old,
  Young,
  Ancient,
  Modern,
  Traditional,
  Classic,
  Vintage,
  Antique,
  Fresh,
  Stale,
  Ripe,
  Rotten,
  Sweet,
  Sour,
  Bitter,
  Salty,
  Spicy,
  Mild,
  Hot,
  Cold,
  Warm,
  Cool,
  Freezing,
  Boiling,
  Wet,
  Dry,
  Damp,
  Humid,
  Arid,
  Moist,
  Sticky,
  Slippery,
  Greasy,
  Oily,
  Watery,
  Juicy,
  Crispy,
  Crunchy,
  Chewy,
  Tender,
  Tough,
  Elastic,
  Flexible,
  Rigid,
  Solid,
  Liquid,
  Gas,
  Plasma,
  Matter,
  Energy,
  Force,
  Power2,
  Strength,
  Weakness,
  Health,
  Sickness,
  Disease,
  Medicine,
  Cure,
  Treatment,
  Therapy,
  Surgery,
  Operation,
  Recovery,
  Healing,
  Pain,
  Pleasure,
  Comfort,
  Discomfort,
  Relief,
  Suffering,
  Injury,
  Wound,
  Bruise,
  Cut,
  Burn,
  Scratch,
  Bite,
  Sting,
  Poison,
  Venom,
  Antidote,
  Vaccine,
  Immunity,
  Infection,
  Virus,
  Bacteria,
  Germ,
  Parasite,
  Fungus,
  Mold,
  Yeast,
  Algae,
  Plankton,
  Coral,
  Seaweed,
  Kelp,
  Fern,
  Moss2,
  Lichen,
  Mushroom,
  Truffle,
  Spore,
  Pollen,
  Nectar,
  Fruit,
  Vegetable,
  Grain,
  Nut2,
  Bean,
  Pea,
  Lentil,
  Rice,
  Wheat,
  Corn2,
  Oat,
  Barley,
  Rye,
  Quinoa,
  Millet,
  Buckwheat,
  Amaranth,
  Chia,
  Flax,
  Hemp,
  Sesame,
  Sunflower,
  Pumpkin,
  Squash,
  Cucumber,
  Zucchini,
  Eggplant,
  Tomato,
  Pepper,
  Chili,
  Onion,
  Garlic,
  Ginger,
  Turmeric,
  Cinnamon,
  Clove,
  Nutmeg,
  Cardamom,
  Saffron,
  Vanilla,
  Mint,
  Basil,
  Oregano,
  Thyme,
  Rosemary,
  Sage,
  Parsley,
  Cilantro,
  Dill,
  Chive,
  Scallion,
  Leek,
  Celery,
  Lettuce,
  Spinach,
  Kale,
  Cabbage,
  Broccoli,
  Cauliflower,
  Brussels,
  Artichoke,
  Asparagus,
  Beet,
  Radish,
  Turnip,
  Parsnip,
  Sweet,
  Potato,
  Yam,
  Cassava,
  Taro,
  Plantain,
  Avocado,
  Olive,
  Date,
  Fig,
  Prune,
  Raisin,
  Apricot,
  Peach,
  Plum,
  Cherry2,
  Berry,
  Blueberry,
  Raspberry,
  Blackberry,
  Cranberry,
  Gooseberry,
  Currant,
  Elderberry,
  Mulberry,
  Boysenberry,
  Huckleberry,
  Lingonberry,
  Cloudberry,
  Strawberry2,
  Kiwi,
  Mango,
  Papaya,
  Pineapple,
  Coconut,
  Passion,
  Guava,
  Lychee,
  Rambutan,
  Durian,
  Jackfruit,
  Breadfruit,
  Starfruit,
  Dragon,
  Persimmon,
  Pomegranate,
  Cranberry2,
  Elderflower,
  Hibiscus,
  Jasmine,
  Lavender,
  Rose,
  Lily,
  Tulip,
  Daffodil,
  Sunflower2,
  Daisy,
  Chrysanthemum,
  Carnation,
  Peony,
  Iris,
  Orchid,
  Violet,
  Pansy,
  Marigold,
  Zinnia,
  Cosmos,
  Petunia,
  Impatiens,
  Begonia,
  Geranium,
  Snapdragon,
  Foxglove,
  Hollyhock,
  Delphinium,
  Larkspur,
  Lupine,
  Poppy,
  Cornflower,
  Bachelor,
  Sweet2,
  Morning,
  Moonflower,
  Evening,
  Four,
  Clock2,
  Mirabilis,
  Bougainvillea,
  Wisteria,
  Honeysuckle,
  Clematis,
  Ivy,
  Virginia,
  Creeper,
  Grape2,
  Vine2,
  Hops,
  Kiwi2,
  Passion2,
  Fruit2,
  Cucumber2,
  Melon,
  Watermelon2,
  Cantaloupe,
  Honeydew,
  Casaba,
  Crenshaw,
  Galia,
  Charentais,
  Canary,
  Santa,
  Claus,
  Christmas,
  Juan,
  Yellow,
  Green,
  Red,
  Blue,
  Purple,
  Pink,
  Orange2,
  Brown,
  Black,
  White,
  Gray,
  Silver,
  Gold,
  Bronze,
  Copper,
  Brass,
  Steel,
  Iron,
  Aluminum,
  Titanium,
  Platinum,
  Palladium,
  Rhodium,
  Iridium,
  Osmium,
  Ruthenium,
  Rhenium,
  Tungsten,
  Tantalum,
  Molybdenum,
  Chromium,
  Vanadium,
  Manganese,
  Cobalt,
  Nickel,
  Zinc,
  Gallium,
  Germanium,
  Arsenic,
  Selenium,
  Bromine,
  Krypton,
  Rubidium,
  Strontium,
  Yttrium,
  Zirconium,
  Niobium,
  Technetium,
  Ruthenium2,
  Rhodium2,
  Palladium2,
  Silver2,
  Cadmium,
  Indium,
  Tin,
  Antimony,
  Tellurium,
  Iodine,
  Xenon,
  Cesium,
  Barium,
  Lanthanum,
  Cerium,
  Praseodymium,
  Neodymium,
  Promethium,
  Samarium,
  Europium,
  Gadolinium,
  Terbium,
  Dysprosium,
  Holmium,
  Erbium,
  Thulium,
  Ytterbium,
  Lutetium,
  Hafnium,
  Tantalum2,
  Tungsten2,
  Rhenium2,
  Osmium2,
  Iridium2,
  Platinum2,
  Gold2,
  Mercury,
  Thallium,
  Lead,
  Bismuth,
  Polonium,
  Astatine,
  Radon,
  Francium,
  Radium,
  Actinium,
  Thorium,
  Protactinium,
  Uranium,
  Neptunium,
  Plutonium,
  Americium,
  Curium,
  Berkelium,
  Californium,
  Einsteinium,
  Fermium,
  Mendelevium,
  Nobelium,
  Lawrencium,
  Rutherfordium,
  Dubnium,
  Seaborgium,
  Bohrium,
  Hassium,
  Meitnerium,
  Darmstadtium,
  Roentgenium,
  Copernicium,
  Nihonium,
  Flerovium,
  Moscovium,
  Livermorium,
  Tennessine,
  Oganesson
} from "lucide-react";

// Video editing interfaces
interface VideoAsset {
  id: string;
  name: string;
  url: string;
  duration: number;
  position: number;
  isActive: boolean;
}

interface TimelineTrack {
  id: string;
  type: 'video' | 'audio' | 'text' | 'image';
  name: string;
  startTime: number;
  duration: number;
  url?: string;
  content?: string;
  color: string;
  endTime: number;
  scale: number;
  visible?: boolean;
}

interface TimelineElement {
  id: string;
  type: 'video' | 'audio' | 'text' | 'image' | 'effect';
  startTime: number;
  duration: number;
  track: number;
  content?: any;
}

interface EditAction {
  type: 'cut' | 'trim' | 'split' | 'merge' | 'effect' | 'transition';
  timestamp: number;
  data: any;
}

interface VideoFilter {
  id: string;
  name: string;
  type: string;
  intensity: number;
}

interface AudioTrack {
  id: string;
  name: string;
  url: string;
  volume: number;
  startTime: number;
  duration: number;
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  startTime: number;
  duration: number;
}

// Available stickers/emojis
const availableStickers = [
  { id: 'smile', icon: Smile, name: 'Smile' },
  { id: 'heart', icon: Heart, name: 'Heart' },
  { id: 'star', icon: Star, name: 'Star' },
  { id: 'sun', icon: Sun, name: 'Sun' },
  { id: 'moon', icon: Moon, name: 'Moon' },
  { id: 'zap', icon: Zap, name: 'Zap' },
  { id: 'crown', icon: Crown, name: 'Crown' },
  { id: 'coffee', icon: Coffee, name: 'Coffee' },
  { id: 'gift', icon: Gift, name: 'Gift' },
  { id: 'camera', icon: Camera, name: 'Camera' }
];

const VideoEditing: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [videoAssets, setVideoAssets] = useState<VideoAsset[]>([]);
  const [timelineTracks, setTimelineTracks] = useState<TimelineTrack[]>([]);
  const [editHistory, setEditHistory] = useState<EditAction[]>([]);
  const [videoFilters, setVideoFilters] = useState<VideoFilter[]>([]);
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [editingMode, setEditingMode] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [currentVideoId, setCurrentVideoId] = useState<string>('');
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [clipboardData, setClipboardData] = useState<any>(null);
  const [projectSettings, setProjectSettings] = useState({
    title: 'Untitled Project',
    resolution: '1920x1080',
    frameRate: 30,
    quality: 'high'
  });

  // New state for UI interactions
  const [activeTab, setActiveTab] = useState('media');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [showTransitions, setShowTransitions] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);
  const audioFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Media playback controls
  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleStop = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, []);

  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleVolumeChange = useCallback((newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol / 100;
    }
  }, []);

  const handleMuteToggle = useCallback(() => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  }, [isMuted]);

  // Timeline management
  const addTimelineTrack = useCallback((track: Omit<TimelineTrack, 'id'>) => {
    const newTrack: TimelineTrack = {
      ...track,
      id: Date.now().toString(),
    };
    setTimelineTracks(prev => [...prev, newTrack]);
  }, []);

  const removeTimelineTrack = useCallback((trackId: string) => {
    setTimelineTracks(prev => prev.filter(track => track.id !== trackId));
  }, []);

  const updateTimelineTrack = useCallback((trackId: string, updates: Partial<TimelineTrack>) => {
    setTimelineTracks(prev => 
      prev.map(track => 
        track.id === trackId ? { ...track, ...updates } : track
      )
    );
  }, []);

  // File upload handlers
  const handleVideoAdd = () => {
    videoFileRef.current?.click();
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const videoId = Date.now().toString();
      
      // Create a temporary video element to get duration
      const tempVideo = document.createElement('video');
      tempVideo.src = url;
      
      tempVideo.addEventListener('loadedmetadata', () => {
        const videoDuration = tempVideo.duration || 0;
        
        const newVideoAsset: VideoAsset = {
          id: videoId,
          name: file.name,
          url: url,
          duration: videoDuration,
          position: videoAssets.length,
          isActive: videoAssets.length === 0
        };
        
        setVideoAssets(prev => [...prev, newVideoAsset]);
        
        if (videoAssets.length === 0) {
          setVideoPreview(url);
          setCurrentVideoId(videoId);
          setEditingMode(true);
        }
        
        // Create timeline track for the video
        const newTrack: TimelineTrack = {
          id: videoId,
          type: 'video',
          name: file.name,
          startTime: 0,
          duration: videoDuration,
          url: url,
          color: '#3b82f6',
          endTime: videoDuration,
          scale: 1,
          visible: true
        };
        
        setTimelineTracks(prev => [...prev, newTrack]);
        
        toast({
          title: "Video Added",
          description: `${file.name} has been added to your video sequence`,
        });
      });
      
      tempVideo.addEventListener('error', () => {
        toast({
          title: "Error Loading Video",
          description: "Failed to load video duration. Please try again.",
          variant: "destructive"
        });
      });
    }
    
    // Reset the file input
    if (event.target) {
      event.target.value = '';
    }
  };

  // Video management
  const handleVideoSelect = useCallback((videoId: string) => {
    const video = videoAssets.find(v => v.id === videoId);
    if (video) {
      setVideoAssets(prev => 
        prev.map(v => ({ ...v, isActive: v.id === videoId }))
      );
      setVideoPreview(video.url);
      setCurrentVideoId(videoId);
      setEditingMode(true);
    }
  }, [videoAssets]);

  const handleVideoDelete = useCallback((videoId: string) => {
    setVideoAssets(prev => prev.filter(v => v.id !== videoId));
    setTimelineTracks(prev => prev.filter(t => t.id !== videoId));
    
    if (currentVideoId === videoId) {
      const remainingVideos = videoAssets.filter(v => v.id !== videoId);
      if (remainingVideos.length > 0) {
        handleVideoSelect(remainingVideos[0].id);
      } else {
        setVideoPreview('');
        setCurrentVideoId('');
        setEditingMode(false);
      }
    }
    
    toast({
      title: "Video Deleted",
      description: "Video has been removed from your project",
    });
  }, [videoAssets, currentVideoId, handleVideoSelect]);

  const handleVideoReorder = useCallback((startIndex: number, endIndex: number) => {
    setVideoAssets(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((video, index) => ({ ...video, position: index }));
    });
  }, []);

  // Template and effects handlers
  const handleTemplateSelect = (templateId: string) => {
    console.log('Template selected:', templateId);
    toast({
      title: "Template Applied",
      description: "Template has been applied to your video",
    });
    setShowTemplates(false);
  };

  const handleStickerSelect = (stickerId: string) => {
    setSelectedSticker(stickerId);
    setShowStickers(false);
    console.log('Sticker selected:', stickerId);
    toast({
      title: "Sticker Added",
      description: "Sticker has been added to your video",
    });
  };

  const handleEffectSelect = (effectId: string) => {
    console.log('Effect selected:', effectId);
    toast({
      title: "Effect Applied",
      description: "Effect has been applied to your video",
    });
    setShowEffects(false);
  };

  const handleTransitionSelect = (transitionId: string) => {
    console.log('Transition selected:', transitionId);
    toast({
      title: "Transition Added",
      description: "Transition has been added to your video",
    });
    setShowTransitions(false);
  };

  // Export handler
  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast({
            title: "Export Complete",
            description: "Your video has been exported successfully",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.code === 'Escape') {
        handleStop();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePlayPause, handleStop]);

  return (
    <DashboardLayout pageTitle="Video Editing Studio">
      <div className="h-full flex flex-col bg-gray-900 text-white overflow-hidden">
        {/* Top Toolbar */}
        <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{projectSettings.title}</h1>
            <Badge variant="secondary">{projectSettings.resolution}</Badge>
            <Badge variant="secondary">{projectSettings.frameRate}fps</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={isExporting}
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Left Sidebar - Tools */}
          <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
                <TabsTrigger value="effects" className="text-xs">Effects</TabsTrigger>
                <TabsTrigger value="audio" className="text-xs">Audio</TabsTrigger>
                <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
              </TabsList>

              <TabsContent value="media" className="flex-1 p-4">
                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    onClick={handleVideoAdd}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setShowTemplates(true)}
                  >
                    <Grid className="h-4 w-4 mr-2" />
                    Templates
                  </Button>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Video Assets</h3>
                    <ScrollArea className="h-40">
                      {videoAssets.map((video) => (
                        <div
                          key={video.id}
                          className={`p-2 rounded cursor-pointer ${
                            video.isActive ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                          onClick={() => handleVideoSelect(video.id)}
                        >
                          <div className="text-sm font-medium truncate">{video.name}</div>
                          <div className="text-xs text-gray-400">
                            {Math.round(video.duration)}s
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="effects" className="flex-1 p-4">
                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    onClick={() => setShowEffects(true)}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Video Effects
                  </Button>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => setShowTransitions(true)}
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Transitions
                  </Button>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => setShowStickers(true)}
                  >
                    <Smile className="h-4 w-4 mr-2" />
                    Stickers
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="flex-1 p-4">
                <div className="space-y-4">
                  <Button className="w-full">
                    <Music className="h-4 w-4 mr-2" />
                    Add Music
                  </Button>
                  
                  <Button className="w-full">
                    <Mic className="h-4 w-4 mr-2" />
                    Record Audio
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="text" className="flex-1 p-4">
                <div className="space-y-4">
                  <Button className="w-full">
                    <Type className="h-4 w-4 mr-2" />
                    Add Text
                  </Button>
                  
                  <Button className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Captions
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Center - Video Preview */}
          <div className="flex-1 flex flex-col bg-black">
            <div className="flex-1 flex items-center justify-center p-4">
              {videoPreview ? (
                <div className="relative max-w-full max-h-full">
                  <video
                    ref={videoRef}
                    src={videoPreview}
                    className="max-w-full max-h-full rounded-lg"
                    controls={false}
                    onTimeUpdate={() => {
                      if (videoRef.current) {
                        setCurrentTime(videoRef.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        setDuration(videoRef.current.duration);
                      }
                    }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <FileVideo className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No video loaded</p>
                  <p className="text-sm">Upload a video to start editing</p>
                  <Button 
                    className="mt-4" 
                    onClick={handleVideoAdd}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="bg-gray-800 p-4 border-t border-gray-700">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  disabled={!videoPreview}
                >
                  {isPlaying ? <Pause /> : <Play />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleStop}
                  disabled={!videoPreview}
                >
                  <Square />
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleMuteToggle}
                  >
                    {isMuted ? <VolumeX /> : <Volume2 />}
                  </Button>
                  
                  <div className="w-20">
                    <Slider
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="text-sm text-gray-400">
                  {Math.floor(currentTime / 60)}:{(Math.floor(currentTime) % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration) % 60).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Timeline Scrubber */}
              {duration > 0 && (
                <div className="relative">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div
                    className="absolute top-0 h-2 bg-blue-500 rounded-lg pointer-events-none"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Project Settings</h3>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="project-title">Title</Label>
                    <Input
                      id="project-title"
                      value={projectSettings.title}
                      onChange={(e) => setProjectSettings(prev => ({
                        ...prev,
                        title: e.target.value
                      }))}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="resolution">Resolution</Label>
                    <select
                      id="resolution"
                      value={projectSettings.resolution}
                      onChange={(e) => setProjectSettings(prev => ({
                        ...prev,
                        resolution: e.target.value
                      }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    >
                      <option value="1920x1080">1920x1080 (Full HD)</option>
                      <option value="1280x720">1280x720 (HD)</option>
                      <option value="3840x2160">3840x2160 (4K)</option>
                    </select>
                  </div>
                </div>
              </div>

              {isExporting && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Export Progress</h3>
                  <Progress value={exportProgress} className="w-full" />
                  <p className="text-xs text-gray-400 mt-1">{exportProgress}%</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="h-48 bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Timeline</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div ref={timelineRef} className="flex-1 bg-gray-900 rounded-lg p-2 overflow-x-auto">
            {timelineTracks.length > 0 ? (
              <div className="space-y-2">
                {timelineTracks.map((track) => (
                  <div
                    key={track.id}
                    className="h-12 bg-blue-600 rounded flex items-center px-2 text-sm relative"
                    style={{ width: `${(track.duration / duration) * 100}%` }}
                  >
                    <span className="truncate">{track.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-6 w-6 p-0"
                      onClick={() => removeTimelineTrack(track.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <Clock className="h-8 w-8 mr-2" />
                <span>Timeline is empty</span>
              </div>
            )}
          </div>
        </div>

        {/* Hidden file inputs */}
        <input
          type="file"
          ref={videoFileRef}
          onChange={handleVideoUpload}
          accept="video/*"
          className="hidden"
        />
        <input
          type="file"
          ref={audioFileRef}
          accept="audio/*"
          className="hidden"
        />
        <input
          type="file"
          ref={imageFileRef}
          accept="image/*"
          className="hidden"
        />

        {/* Modals */}
        {showStickers && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Choose Sticker</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowStickers(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {availableStickers.map((sticker) => (
                  <Button
                    key={sticker.id}
                    variant="ghost"
                    className="h-12 w-12 p-0"
                    onClick={() => handleStickerSelect(sticker.id)}
                  >
                    <sticker.icon className="h-6 w-6" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VideoEditing;
