# Démo — GraphQL Recette Server

---

## 1. Lister toutes les recettes
> Query — lecture simple

```graphql
query {
  recipes {
    id title difficulty likeCount
    owner { pseudo }
    type { name }
  }
}
```

---

## 2. Récupérer une recette complète
> Query — relations imbriquées

```graphql
query {
  recipe(id: "r1") {
    title description difficulty
    recipe_steps { step_number step_description }
    recipeIngredients { quantity quantity_type ingredient { name } }
    comments { content owner { pseudo } }
  }
}
```

---

## 3. Recherche avancée avec filtres
> SearchQuery — filtres + tri

```graphql
query {
  searchRecipes(
    filter: { isPublic: true, cookingTime: { lt: 30 } }
    sortBy: [{ field: LIKE_COUNT, direction: DESC }]
  ) {
    title cooking_time likeCount
  }
}
```

---

## 4. Créer un utilisateur
> Mutation — écriture

```graphql
mutation {
  addUser(
    firstName: "Alice"
    lastName: "Demo"
    email: "alice@demo.com"
    pseudo: "alice_demo"
    password: "1234"
    roles: [STANDARD]
  ) {
    id pseudo email roles
  }
}
```

---

## 5. Vérifier la création
> Query — vérification après mutation

```graphql
query {
  users { id pseudo email roles }
}
```

---

## 6. Ajouter un commentaire
> Mutation — écriture

```graphql
mutation {
  addComment(
    content: "Incroyable cette recette !"
    ownerId: "u1"
    recipeId: "r1"
  ) {
    id content owner { pseudo }
  }
}
```

---

## 7. Vérifier le commentaire
> Query — vérification après mutation

```graphql
query {
  recipe(id: "r1") {
    title
    comments { content owner { pseudo } createdAt }
  }
}
```

---

## 8. Signaler un contenu
> Mutation — écriture

```graphql
mutation {
  addReport(
    message: "Contenu inapproprié"
    reporterId: "u2"
    targetId: "r1"
    type: SPAM
  ) {
    id type message reporter { pseudo } recipe { title }
  }
}
```

---

## Légende
| Couleur | Type | Description |
|---------|------|-------------|
| 🟦 | Query | Lecture de données |
| 🟥 | Mutation | Écriture de données |
| 🟩 | SearchQuery | Lecture avec filtres et tri |
