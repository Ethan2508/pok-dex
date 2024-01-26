<script lang="ts">
  import { selectedTags, setSelectedTags } from "src/stores/store"

  import { navigate } from "svelte-navigator"

  interface Blog {
    path: string
    title: string
    description: string
    tags: string[]
  }
  const tags = [
    "react",
    "svelte",
    "development",
    "frontend",
    "investing",
    "finance",
    "angular",
    "elm",
    "vue",
  ]
  const blogLinks: Blog[] = [
    {
      path: "/react-vs-svelte",
      title: "React vs Svelte",
      description:
        "We all know React is more popular, but which framework is better?",
      tags: ["react", "svelte", "development", "frontend"],
    },
    {
      path: "/vue-vs-angular",
      title: "Vue vs Angular",
      description:
        "Vue and Angular are both great frameworks, let's explore the main difference between them",
      tags: ["vue", "angular", "development", "frontend"],
    },
    {
      path: "/investing-advice",
      title: "Investing Advice for 20 year olds",
      description:
        "Ever wonder how to grow your money? In this article, I will give advice for young people to grow their money fast",
      tags: ["investing", "finance"],
    },
    {
      path: "/my-favorite-frontend-framework",
      title: "My Favorite Framework",
      description:
        "Out of all the frontend frameworks out there, which one is so feature rich and easy to code in, that it becomes my favorite?",
      tags: [
        "vue",
        "angular",
        "react",
        "svelte",
        "elm",
        "frontend",
        "development",
      ],
    },
  ]

  const tagsIncluded = (blog: Blog, searchTags: string[]): boolean => {
    for (let i = 0; i < searchTags.length; i++) {
      if (blog.tags.includes(searchTags[i])) {
        return true
      }
    }
    return false
  }
</script>

<div class="prose mx-auto w-full text-center">
  <h1 class="mt-5">Blog Articles</h1>
  <div class="flex flex-wrap mx-auto">
    {#each tags as tag}
      <button
        class={`btn ${
          $selectedTags.includes(tag) ? "btn-secondary" : "btn-neutral"
        } m-1`}
        on:click={() => setSelectedTags(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>
  {#each blogLinks as blog}
    {#if tagsIncluded(blog, $selectedTags) || $selectedTags.length === 0}
      <button
        on:click={() => navigate(blog.path)}
        class="bg-neutral hover:bg-neutral-focus my-5 p-8 card w-full text-neutral-content"
      >
        <p class="text-2xl">{blog.title}</p>
        <p>{blog.description}</p>
        <div class="flex flex-wrap">
          {#each blog.tags as tag}
            <div class="px-4 py-2 m-2 bg-secondary rounded-md">
              {tag}
            </div>
          {/each}
        </div>
      </button>
    {/if}
  {/each}
</div>
